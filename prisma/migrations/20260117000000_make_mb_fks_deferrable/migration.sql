-- Make Foreign Keys Deferrable for Replication

BEGIN;

-- 1. mb_artist_alias
ALTER TABLE "mb_artist_alias" DROP CONSTRAINT "mb_artist_alias_artist_fkey";
ALTER TABLE "mb_artist_alias" ADD CONSTRAINT "mb_artist_alias_artist_fkey" 
    FOREIGN KEY ("artist") REFERENCES "mb_artist"("id") 
    ON DELETE NO ACTION ON UPDATE CASCADE 
    DEFERRABLE INITIALLY DEFERRED;

-- 2. mb_l_artist_url
ALTER TABLE "mb_l_artist_url" DROP CONSTRAINT "mb_l_artist_url_entity0_fkey";
ALTER TABLE "mb_l_artist_url" ADD CONSTRAINT "mb_l_artist_url_entity0_fkey" 
    FOREIGN KEY ("entity0") REFERENCES "mb_artist"("id") 
    ON DELETE CASCADE ON UPDATE CASCADE 
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE "mb_l_artist_url" DROP CONSTRAINT "mb_l_artist_url_entity1_fkey";
ALTER TABLE "mb_l_artist_url" ADD CONSTRAINT "mb_l_artist_url_entity1_fkey" 
    FOREIGN KEY ("entity1") REFERENCES "mb_url"("id") 
    ON DELETE CASCADE ON UPDATE CASCADE 
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE "mb_l_artist_url" DROP CONSTRAINT "mb_l_artist_url_link_fkey";
ALTER TABLE "mb_l_artist_url" ADD CONSTRAINT "mb_l_artist_url_link_fkey" 
    FOREIGN KEY ("link") REFERENCES "mb_link"("id") 
    ON DELETE CASCADE ON UPDATE CASCADE 
    DEFERRABLE INITIALLY DEFERRED;

-- 3. mb_link
ALTER TABLE "mb_link" DROP CONSTRAINT "mb_link_link_type_fkey";
ALTER TABLE "mb_link" ADD CONSTRAINT "mb_link_link_type_fkey" 
    FOREIGN KEY ("link_type") REFERENCES "mb_link_type"("id") 
    ON DELETE CASCADE ON UPDATE CASCADE 
    DEFERRABLE INITIALLY DEFERRED;

COMMIT;
