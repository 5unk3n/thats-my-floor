#!/bin/bash

# Configuration
RESOURCE_GROUP="rg-app-dev" # Update if different
VNET_NAME="vnet-app-dev"   # Update if different
SUBNET_NAME="snet-app-private" # Update if different
VM_NAME="vm-network-test-$(date +%s)"
IMAGE="Ubuntu2204"
ADMIN_USERNAME="azureuser"

echo "Checking for Azure CLI..."
if ! command -v az &> /dev/null; then
    echo "Error: Azure CLI (az) is not installed."
    echo "Please install it or run this script in an environment with az installed."
    exit 1
fi

echo "Checking authentication..."
az account show &> /dev/null
if [ $? -ne 0 ]; then
    echo "Error: Not logged in. Please run 'az login' first."
    exit 1
fi

echo "Starting Network Verification..."
echo "Target Resource Group: $RESOURCE_GROUP"
echo "Target VNet: $VNET_NAME"
echo "Target Subnet: $SUBNET_NAME"

# 1. Verify Subnet Existence
echo "Verifying Subnet..."
SUBNET_ID=$(az network vnet subnet show --resource-group $RESOURCE_GROUP --vnet-name $VNET_NAME --name $SUBNET_NAME --query id --output tsv 2>/dev/null)

if [ -z "$SUBNET_ID" ]; then
    echo "Error: Subnet '$SUBNET_NAME' not found in VNet '$VNET_NAME'."
    exit 1
fi
echo "Subnet found: $SUBNET_ID"

# 2. Create Test VM
echo "Creating Test VM '$VM_NAME' in '$SUBNET_NAME' (This may take a few minutes)..."
az vm create \
    --resource-group $RESOURCE_GROUP \
    --name $VM_NAME \
    --image $IMAGE \
    --vnet-name $VNET_NAME \
    --subnet $SUBNET_NAME \
    --admin-username $ADMIN_USERNAME \
    --generate-ssh-keys \
    --public-ip-address "" \
    --nsg "" \
    --output json > vm_create_output.json

if [ $? -ne 0 ]; then
    echo "Error: Failed to create VM."
    exit 1
fi
echo "VM created successfully."

# 3. Verify Outbound Connectivity (NAT Gateway)
echo "Verifying Outbound Connectivity (via NAT Gateway)..."
# Using 'run-command' to execute curl inside the VM
az vm run-command invoke \
    --resource-group $RESOURCE_GROUP \
    --name $VM_NAME \
    --command-id RunShellScript \
    --scripts "curl -I https://www.google.com --connect-timeout 5" \
    --output json > connectivity_check.json

if grep -q "200 OK" connectivity_check.json || grep -q "301 Moved" connectivity_check.json; then
    echo "SUCCESS: Outbound connectivity verified."
else
    echo "FAILURE: Could not verify outbound connectivity. Check NAT Gateway configuration."
    echo "Output saved to connectivity_check.json"
fi

# 4. Clean up
echo "Cleaning up..."
echo "Deleting VM '$VM_NAME'..."
az vm delete --resource-group $RESOURCE_GROUP --name $VM_NAME --yes --no-wait
echo "Note: VM deletion initiated in background. Associated resources (NIC, Disk) might need manual cleanup if not deleted automatically."

echo "Verification Script Finished."
