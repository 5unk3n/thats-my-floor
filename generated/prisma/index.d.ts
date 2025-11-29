
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>
/**
 * Model Artist
 * 
 */
export type Artist = $Result.DefaultSelection<Prisma.$ArtistPayload>
/**
 * Model Concert
 * 
 */
export type Concert = $Result.DefaultSelection<Prisma.$ConcertPayload>
/**
 * Model BookingLink
 * 
 */
export type BookingLink = $Result.DefaultSelection<Prisma.$BookingLinkPayload>
/**
 * Model UserArtist
 * 
 */
export type UserArtist = $Result.DefaultSelection<Prisma.$UserArtistPayload>
/**
 * Model Setlist
 * 
 */
export type Setlist = $Result.DefaultSelection<Prisma.$SetlistPayload>
/**
 * Model SetlistTrack
 * 
 */
export type SetlistTrack = $Result.DefaultSelection<Prisma.$SetlistTrackPayload>
/**
 * Model NotificationSettings
 * 
 */
export type NotificationSettings = $Result.DefaultSelection<Prisma.$NotificationSettingsPayload>
/**
 * Model UserDevice
 * 
 */
export type UserDevice = $Result.DefaultSelection<Prisma.$UserDevicePayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.artist`: Exposes CRUD operations for the **Artist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Artists
    * const artists = await prisma.artist.findMany()
    * ```
    */
  get artist(): Prisma.ArtistDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.concert`: Exposes CRUD operations for the **Concert** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Concerts
    * const concerts = await prisma.concert.findMany()
    * ```
    */
  get concert(): Prisma.ConcertDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bookingLink`: Exposes CRUD operations for the **BookingLink** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BookingLinks
    * const bookingLinks = await prisma.bookingLink.findMany()
    * ```
    */
  get bookingLink(): Prisma.BookingLinkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userArtist`: Exposes CRUD operations for the **UserArtist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserArtists
    * const userArtists = await prisma.userArtist.findMany()
    * ```
    */
  get userArtist(): Prisma.UserArtistDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.setlist`: Exposes CRUD operations for the **Setlist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Setlists
    * const setlists = await prisma.setlist.findMany()
    * ```
    */
  get setlist(): Prisma.SetlistDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.setlistTrack`: Exposes CRUD operations for the **SetlistTrack** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SetlistTracks
    * const setlistTracks = await prisma.setlistTrack.findMany()
    * ```
    */
  get setlistTrack(): Prisma.SetlistTrackDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notificationSettings`: Exposes CRUD operations for the **NotificationSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NotificationSettings
    * const notificationSettings = await prisma.notificationSettings.findMany()
    * ```
    */
  get notificationSettings(): Prisma.NotificationSettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userDevice`: Exposes CRUD operations for the **UserDevice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserDevices
    * const userDevices = await prisma.userDevice.findMany()
    * ```
    */
  get userDevice(): Prisma.UserDeviceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.0.1
   * Query Engine version: f09f2815f091dbba658cdcd2264306d88bb5bda6
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Account: 'Account',
    Session: 'Session',
    VerificationToken: 'VerificationToken',
    Artist: 'Artist',
    Concert: 'Concert',
    BookingLink: 'BookingLink',
    UserArtist: 'UserArtist',
    Setlist: 'Setlist',
    SetlistTrack: 'SetlistTrack',
    NotificationSettings: 'NotificationSettings',
    UserDevice: 'UserDevice',
    Notification: 'Notification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "account" | "session" | "verificationToken" | "artist" | "concert" | "bookingLink" | "userArtist" | "setlist" | "setlistTrack" | "notificationSettings" | "userDevice" | "notification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      Artist: {
        payload: Prisma.$ArtistPayload<ExtArgs>
        fields: Prisma.ArtistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArtistFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArtistFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload>
          }
          findFirst: {
            args: Prisma.ArtistFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArtistFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload>
          }
          findMany: {
            args: Prisma.ArtistFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload>[]
          }
          create: {
            args: Prisma.ArtistCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload>
          }
          createMany: {
            args: Prisma.ArtistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArtistCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload>[]
          }
          delete: {
            args: Prisma.ArtistDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload>
          }
          update: {
            args: Prisma.ArtistUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload>
          }
          deleteMany: {
            args: Prisma.ArtistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArtistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArtistUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload>[]
          }
          upsert: {
            args: Prisma.ArtistUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArtistPayload>
          }
          aggregate: {
            args: Prisma.ArtistAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArtist>
          }
          groupBy: {
            args: Prisma.ArtistGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArtistGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArtistCountArgs<ExtArgs>
            result: $Utils.Optional<ArtistCountAggregateOutputType> | number
          }
        }
      }
      Concert: {
        payload: Prisma.$ConcertPayload<ExtArgs>
        fields: Prisma.ConcertFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConcertFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcertPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConcertFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcertPayload>
          }
          findFirst: {
            args: Prisma.ConcertFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcertPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConcertFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcertPayload>
          }
          findMany: {
            args: Prisma.ConcertFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcertPayload>[]
          }
          create: {
            args: Prisma.ConcertCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcertPayload>
          }
          createMany: {
            args: Prisma.ConcertCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConcertCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcertPayload>[]
          }
          delete: {
            args: Prisma.ConcertDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcertPayload>
          }
          update: {
            args: Prisma.ConcertUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcertPayload>
          }
          deleteMany: {
            args: Prisma.ConcertDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConcertUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConcertUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcertPayload>[]
          }
          upsert: {
            args: Prisma.ConcertUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConcertPayload>
          }
          aggregate: {
            args: Prisma.ConcertAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConcert>
          }
          groupBy: {
            args: Prisma.ConcertGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConcertGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConcertCountArgs<ExtArgs>
            result: $Utils.Optional<ConcertCountAggregateOutputType> | number
          }
        }
      }
      BookingLink: {
        payload: Prisma.$BookingLinkPayload<ExtArgs>
        fields: Prisma.BookingLinkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookingLinkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingLinkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookingLinkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingLinkPayload>
          }
          findFirst: {
            args: Prisma.BookingLinkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingLinkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookingLinkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingLinkPayload>
          }
          findMany: {
            args: Prisma.BookingLinkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingLinkPayload>[]
          }
          create: {
            args: Prisma.BookingLinkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingLinkPayload>
          }
          createMany: {
            args: Prisma.BookingLinkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookingLinkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingLinkPayload>[]
          }
          delete: {
            args: Prisma.BookingLinkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingLinkPayload>
          }
          update: {
            args: Prisma.BookingLinkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingLinkPayload>
          }
          deleteMany: {
            args: Prisma.BookingLinkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookingLinkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookingLinkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingLinkPayload>[]
          }
          upsert: {
            args: Prisma.BookingLinkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingLinkPayload>
          }
          aggregate: {
            args: Prisma.BookingLinkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBookingLink>
          }
          groupBy: {
            args: Prisma.BookingLinkGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookingLinkGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookingLinkCountArgs<ExtArgs>
            result: $Utils.Optional<BookingLinkCountAggregateOutputType> | number
          }
        }
      }
      UserArtist: {
        payload: Prisma.$UserArtistPayload<ExtArgs>
        fields: Prisma.UserArtistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserArtistFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserArtistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserArtistFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserArtistPayload>
          }
          findFirst: {
            args: Prisma.UserArtistFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserArtistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserArtistFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserArtistPayload>
          }
          findMany: {
            args: Prisma.UserArtistFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserArtistPayload>[]
          }
          create: {
            args: Prisma.UserArtistCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserArtistPayload>
          }
          createMany: {
            args: Prisma.UserArtistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserArtistCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserArtistPayload>[]
          }
          delete: {
            args: Prisma.UserArtistDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserArtistPayload>
          }
          update: {
            args: Prisma.UserArtistUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserArtistPayload>
          }
          deleteMany: {
            args: Prisma.UserArtistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserArtistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserArtistUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserArtistPayload>[]
          }
          upsert: {
            args: Prisma.UserArtistUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserArtistPayload>
          }
          aggregate: {
            args: Prisma.UserArtistAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserArtist>
          }
          groupBy: {
            args: Prisma.UserArtistGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserArtistGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserArtistCountArgs<ExtArgs>
            result: $Utils.Optional<UserArtistCountAggregateOutputType> | number
          }
        }
      }
      Setlist: {
        payload: Prisma.$SetlistPayload<ExtArgs>
        fields: Prisma.SetlistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SetlistFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetlistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SetlistFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetlistPayload>
          }
          findFirst: {
            args: Prisma.SetlistFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetlistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SetlistFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetlistPayload>
          }
          findMany: {
            args: Prisma.SetlistFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetlistPayload>[]
          }
          create: {
            args: Prisma.SetlistCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetlistPayload>
          }
          createMany: {
            args: Prisma.SetlistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SetlistCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetlistPayload>[]
          }
          delete: {
            args: Prisma.SetlistDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetlistPayload>
          }
          update: {
            args: Prisma.SetlistUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetlistPayload>
          }
          deleteMany: {
            args: Prisma.SetlistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SetlistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SetlistUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetlistPayload>[]
          }
          upsert: {
            args: Prisma.SetlistUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetlistPayload>
          }
          aggregate: {
            args: Prisma.SetlistAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSetlist>
          }
          groupBy: {
            args: Prisma.SetlistGroupByArgs<ExtArgs>
            result: $Utils.Optional<SetlistGroupByOutputType>[]
          }
          count: {
            args: Prisma.SetlistCountArgs<ExtArgs>
            result: $Utils.Optional<SetlistCountAggregateOutputType> | number
          }
        }
      }
      SetlistTrack: {
        payload: Prisma.$SetlistTrackPayload<ExtArgs>
        fields: Prisma.SetlistTrackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SetlistTrackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetlistTrackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SetlistTrackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetlistTrackPayload>
          }
          findFirst: {
            args: Prisma.SetlistTrackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetlistTrackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SetlistTrackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetlistTrackPayload>
          }
          findMany: {
            args: Prisma.SetlistTrackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetlistTrackPayload>[]
          }
          create: {
            args: Prisma.SetlistTrackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetlistTrackPayload>
          }
          createMany: {
            args: Prisma.SetlistTrackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SetlistTrackCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetlistTrackPayload>[]
          }
          delete: {
            args: Prisma.SetlistTrackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetlistTrackPayload>
          }
          update: {
            args: Prisma.SetlistTrackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetlistTrackPayload>
          }
          deleteMany: {
            args: Prisma.SetlistTrackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SetlistTrackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SetlistTrackUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetlistTrackPayload>[]
          }
          upsert: {
            args: Prisma.SetlistTrackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SetlistTrackPayload>
          }
          aggregate: {
            args: Prisma.SetlistTrackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSetlistTrack>
          }
          groupBy: {
            args: Prisma.SetlistTrackGroupByArgs<ExtArgs>
            result: $Utils.Optional<SetlistTrackGroupByOutputType>[]
          }
          count: {
            args: Prisma.SetlistTrackCountArgs<ExtArgs>
            result: $Utils.Optional<SetlistTrackCountAggregateOutputType> | number
          }
        }
      }
      NotificationSettings: {
        payload: Prisma.$NotificationSettingsPayload<ExtArgs>
        fields: Prisma.NotificationSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationSettingsPayload>
          }
          findFirst: {
            args: Prisma.NotificationSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationSettingsPayload>
          }
          findMany: {
            args: Prisma.NotificationSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationSettingsPayload>[]
          }
          create: {
            args: Prisma.NotificationSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationSettingsPayload>
          }
          createMany: {
            args: Prisma.NotificationSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationSettingsPayload>[]
          }
          delete: {
            args: Prisma.NotificationSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationSettingsPayload>
          }
          update: {
            args: Prisma.NotificationSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationSettingsPayload>
          }
          deleteMany: {
            args: Prisma.NotificationSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationSettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationSettingsPayload>[]
          }
          upsert: {
            args: Prisma.NotificationSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationSettingsPayload>
          }
          aggregate: {
            args: Prisma.NotificationSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotificationSettings>
          }
          groupBy: {
            args: Prisma.NotificationSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationSettingsCountAggregateOutputType> | number
          }
        }
      }
      UserDevice: {
        payload: Prisma.$UserDevicePayload<ExtArgs>
        fields: Prisma.UserDeviceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserDeviceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDevicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserDeviceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDevicePayload>
          }
          findFirst: {
            args: Prisma.UserDeviceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDevicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserDeviceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDevicePayload>
          }
          findMany: {
            args: Prisma.UserDeviceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDevicePayload>[]
          }
          create: {
            args: Prisma.UserDeviceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDevicePayload>
          }
          createMany: {
            args: Prisma.UserDeviceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserDeviceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDevicePayload>[]
          }
          delete: {
            args: Prisma.UserDeviceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDevicePayload>
          }
          update: {
            args: Prisma.UserDeviceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDevicePayload>
          }
          deleteMany: {
            args: Prisma.UserDeviceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserDeviceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserDeviceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDevicePayload>[]
          }
          upsert: {
            args: Prisma.UserDeviceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDevicePayload>
          }
          aggregate: {
            args: Prisma.UserDeviceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserDevice>
          }
          groupBy: {
            args: Prisma.UserDeviceGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserDeviceGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserDeviceCountArgs<ExtArgs>
            result: $Utils.Optional<UserDeviceCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    account?: AccountOmit
    session?: SessionOmit
    verificationToken?: VerificationTokenOmit
    artist?: ArtistOmit
    concert?: ConcertOmit
    bookingLink?: BookingLinkOmit
    userArtist?: UserArtistOmit
    setlist?: SetlistOmit
    setlistTrack?: SetlistTrackOmit
    notificationSettings?: NotificationSettingsOmit
    userDevice?: UserDeviceOmit
    notification?: NotificationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    sessions: number
    followedArtists: number
    devices: number
    notifications: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    followedArtists?: boolean | UserCountOutputTypeCountFollowedArtistsArgs
    devices?: boolean | UserCountOutputTypeCountDevicesArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFollowedArtistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserArtistWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDevicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserDeviceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }


  /**
   * Count Type ArtistCountOutputType
   */

  export type ArtistCountOutputType = {
    concerts: number
    followers: number
    setlists: number
  }

  export type ArtistCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    concerts?: boolean | ArtistCountOutputTypeCountConcertsArgs
    followers?: boolean | ArtistCountOutputTypeCountFollowersArgs
    setlists?: boolean | ArtistCountOutputTypeCountSetlistsArgs
  }

  // Custom InputTypes
  /**
   * ArtistCountOutputType without action
   */
  export type ArtistCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArtistCountOutputType
     */
    select?: ArtistCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ArtistCountOutputType without action
   */
  export type ArtistCountOutputTypeCountConcertsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConcertWhereInput
  }

  /**
   * ArtistCountOutputType without action
   */
  export type ArtistCountOutputTypeCountFollowersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserArtistWhereInput
  }

  /**
   * ArtistCountOutputType without action
   */
  export type ArtistCountOutputTypeCountSetlistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SetlistWhereInput
  }


  /**
   * Count Type ConcertCountOutputType
   */

  export type ConcertCountOutputType = {
    bookingLinks: number
    setlists: number
    notifications: number
  }

  export type ConcertCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookingLinks?: boolean | ConcertCountOutputTypeCountBookingLinksArgs
    setlists?: boolean | ConcertCountOutputTypeCountSetlistsArgs
    notifications?: boolean | ConcertCountOutputTypeCountNotificationsArgs
  }

  // Custom InputTypes
  /**
   * ConcertCountOutputType without action
   */
  export type ConcertCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConcertCountOutputType
     */
    select?: ConcertCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConcertCountOutputType without action
   */
  export type ConcertCountOutputTypeCountBookingLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingLinkWhereInput
  }

  /**
   * ConcertCountOutputType without action
   */
  export type ConcertCountOutputTypeCountSetlistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SetlistWhereInput
  }

  /**
   * ConcertCountOutputType without action
   */
  export type ConcertCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }


  /**
   * Count Type SetlistCountOutputType
   */

  export type SetlistCountOutputType = {
    tracks: number
  }

  export type SetlistCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tracks?: boolean | SetlistCountOutputTypeCountTracksArgs
  }

  // Custom InputTypes
  /**
   * SetlistCountOutputType without action
   */
  export type SetlistCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SetlistCountOutputType
     */
    select?: SetlistCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SetlistCountOutputType without action
   */
  export type SetlistCountOutputTypeCountTracksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SetlistTrackWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    followedArtists?: boolean | User$followedArtistsArgs<ExtArgs>
    notificationSettings?: boolean | User$notificationSettingsArgs<ExtArgs>
    devices?: boolean | User$devicesArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    followedArtists?: boolean | User$followedArtistsArgs<ExtArgs>
    notificationSettings?: boolean | User$notificationSettingsArgs<ExtArgs>
    devices?: boolean | User$devicesArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      followedArtists: Prisma.$UserArtistPayload<ExtArgs>[]
      notificationSettings: Prisma.$NotificationSettingsPayload<ExtArgs> | null
      devices: Prisma.$UserDevicePayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string | null
      emailVerified: Date | null
      image: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    followedArtists<T extends User$followedArtistsArgs<ExtArgs> = {}>(args?: Subset<T, User$followedArtistsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserArtistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notificationSettings<T extends User$notificationSettingsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationSettingsArgs<ExtArgs>>): Prisma__NotificationSettingsClient<$Result.GetResult<Prisma.$NotificationSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    devices<T extends User$devicesArgs<ExtArgs> = {}>(args?: Subset<T, User$devicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.followedArtists
   */
  export type User$followedArtistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArtist
     */
    select?: UserArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserArtist
     */
    omit?: UserArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArtistInclude<ExtArgs> | null
    where?: UserArtistWhereInput
    orderBy?: UserArtistOrderByWithRelationInput | UserArtistOrderByWithRelationInput[]
    cursor?: UserArtistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserArtistScalarFieldEnum | UserArtistScalarFieldEnum[]
  }

  /**
   * User.notificationSettings
   */
  export type User$notificationSettingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationSettings
     */
    select?: NotificationSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationSettings
     */
    omit?: NotificationSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationSettingsInclude<ExtArgs> | null
    where?: NotificationSettingsWhereInput
  }

  /**
   * User.devices
   */
  export type User$devicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDevice
     */
    select?: UserDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDevice
     */
    omit?: UserDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDeviceInclude<ExtArgs> | null
    where?: UserDeviceWhereInput
    orderBy?: UserDeviceOrderByWithRelationInput | UserDeviceOrderByWithRelationInput[]
    cursor?: UserDeviceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserDeviceScalarFieldEnum | UserDeviceScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    createdAt: Date
    updatedAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionToken" | "userId" | "expires" | "createdAt" | "updatedAt", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionToken: string
      userId: string
      expires: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
    createdAt: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
    createdAt: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    createdAt: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    createdAt?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    createdAt?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    createdAt?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    createdAt: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
    createdAt?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"identifier" | "token" | "expires" | "createdAt", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires: Date
      createdAt: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { identifier: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
    readonly createdAt: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Model Artist
   */

  export type AggregateArtist = {
    _count: ArtistCountAggregateOutputType | null
    _avg: ArtistAvgAggregateOutputType | null
    _sum: ArtistSumAggregateOutputType | null
    _min: ArtistMinAggregateOutputType | null
    _max: ArtistMaxAggregateOutputType | null
  }

  export type ArtistAvgAggregateOutputType = {
    followerCount: number | null
  }

  export type ArtistSumAggregateOutputType = {
    followerCount: number | null
  }

  export type ArtistMinAggregateOutputType = {
    id: string | null
    name: string | null
    image: string | null
    genre: string | null
    description: string | null
    spotifyArtistId: string | null
    followerCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArtistMaxAggregateOutputType = {
    id: string | null
    name: string | null
    image: string | null
    genre: string | null
    description: string | null
    spotifyArtistId: string | null
    followerCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArtistCountAggregateOutputType = {
    id: number
    name: number
    image: number
    genre: number
    description: number
    spotifyArtistId: number
    followerCount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ArtistAvgAggregateInputType = {
    followerCount?: true
  }

  export type ArtistSumAggregateInputType = {
    followerCount?: true
  }

  export type ArtistMinAggregateInputType = {
    id?: true
    name?: true
    image?: true
    genre?: true
    description?: true
    spotifyArtistId?: true
    followerCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArtistMaxAggregateInputType = {
    id?: true
    name?: true
    image?: true
    genre?: true
    description?: true
    spotifyArtistId?: true
    followerCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArtistCountAggregateInputType = {
    id?: true
    name?: true
    image?: true
    genre?: true
    description?: true
    spotifyArtistId?: true
    followerCount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ArtistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Artist to aggregate.
     */
    where?: ArtistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Artists to fetch.
     */
    orderBy?: ArtistOrderByWithRelationInput | ArtistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArtistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Artists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Artists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Artists
    **/
    _count?: true | ArtistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArtistAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArtistSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArtistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArtistMaxAggregateInputType
  }

  export type GetArtistAggregateType<T extends ArtistAggregateArgs> = {
        [P in keyof T & keyof AggregateArtist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArtist[P]>
      : GetScalarType<T[P], AggregateArtist[P]>
  }




  export type ArtistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArtistWhereInput
    orderBy?: ArtistOrderByWithAggregationInput | ArtistOrderByWithAggregationInput[]
    by: ArtistScalarFieldEnum[] | ArtistScalarFieldEnum
    having?: ArtistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArtistCountAggregateInputType | true
    _avg?: ArtistAvgAggregateInputType
    _sum?: ArtistSumAggregateInputType
    _min?: ArtistMinAggregateInputType
    _max?: ArtistMaxAggregateInputType
  }

  export type ArtistGroupByOutputType = {
    id: string
    name: string
    image: string | null
    genre: string | null
    description: string | null
    spotifyArtistId: string | null
    followerCount: number
    createdAt: Date
    updatedAt: Date
    _count: ArtistCountAggregateOutputType | null
    _avg: ArtistAvgAggregateOutputType | null
    _sum: ArtistSumAggregateOutputType | null
    _min: ArtistMinAggregateOutputType | null
    _max: ArtistMaxAggregateOutputType | null
  }

  type GetArtistGroupByPayload<T extends ArtistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArtistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArtistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArtistGroupByOutputType[P]>
            : GetScalarType<T[P], ArtistGroupByOutputType[P]>
        }
      >
    >


  export type ArtistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    image?: boolean
    genre?: boolean
    description?: boolean
    spotifyArtistId?: boolean
    followerCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    concerts?: boolean | Artist$concertsArgs<ExtArgs>
    followers?: boolean | Artist$followersArgs<ExtArgs>
    setlists?: boolean | Artist$setlistsArgs<ExtArgs>
    _count?: boolean | ArtistCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["artist"]>

  export type ArtistSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    image?: boolean
    genre?: boolean
    description?: boolean
    spotifyArtistId?: boolean
    followerCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["artist"]>

  export type ArtistSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    image?: boolean
    genre?: boolean
    description?: boolean
    spotifyArtistId?: boolean
    followerCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["artist"]>

  export type ArtistSelectScalar = {
    id?: boolean
    name?: boolean
    image?: boolean
    genre?: boolean
    description?: boolean
    spotifyArtistId?: boolean
    followerCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ArtistOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "image" | "genre" | "description" | "spotifyArtistId" | "followerCount" | "createdAt" | "updatedAt", ExtArgs["result"]["artist"]>
  export type ArtistInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    concerts?: boolean | Artist$concertsArgs<ExtArgs>
    followers?: boolean | Artist$followersArgs<ExtArgs>
    setlists?: boolean | Artist$setlistsArgs<ExtArgs>
    _count?: boolean | ArtistCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ArtistIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ArtistIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ArtistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Artist"
    objects: {
      concerts: Prisma.$ConcertPayload<ExtArgs>[]
      followers: Prisma.$UserArtistPayload<ExtArgs>[]
      setlists: Prisma.$SetlistPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      image: string | null
      genre: string | null
      description: string | null
      spotifyArtistId: string | null
      followerCount: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["artist"]>
    composites: {}
  }

  type ArtistGetPayload<S extends boolean | null | undefined | ArtistDefaultArgs> = $Result.GetResult<Prisma.$ArtistPayload, S>

  type ArtistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArtistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArtistCountAggregateInputType | true
    }

  export interface ArtistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Artist'], meta: { name: 'Artist' } }
    /**
     * Find zero or one Artist that matches the filter.
     * @param {ArtistFindUniqueArgs} args - Arguments to find a Artist
     * @example
     * // Get one Artist
     * const artist = await prisma.artist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArtistFindUniqueArgs>(args: SelectSubset<T, ArtistFindUniqueArgs<ExtArgs>>): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Artist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArtistFindUniqueOrThrowArgs} args - Arguments to find a Artist
     * @example
     * // Get one Artist
     * const artist = await prisma.artist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArtistFindUniqueOrThrowArgs>(args: SelectSubset<T, ArtistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Artist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistFindFirstArgs} args - Arguments to find a Artist
     * @example
     * // Get one Artist
     * const artist = await prisma.artist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArtistFindFirstArgs>(args?: SelectSubset<T, ArtistFindFirstArgs<ExtArgs>>): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Artist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistFindFirstOrThrowArgs} args - Arguments to find a Artist
     * @example
     * // Get one Artist
     * const artist = await prisma.artist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArtistFindFirstOrThrowArgs>(args?: SelectSubset<T, ArtistFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Artists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Artists
     * const artists = await prisma.artist.findMany()
     * 
     * // Get first 10 Artists
     * const artists = await prisma.artist.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const artistWithIdOnly = await prisma.artist.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArtistFindManyArgs>(args?: SelectSubset<T, ArtistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Artist.
     * @param {ArtistCreateArgs} args - Arguments to create a Artist.
     * @example
     * // Create one Artist
     * const Artist = await prisma.artist.create({
     *   data: {
     *     // ... data to create a Artist
     *   }
     * })
     * 
     */
    create<T extends ArtistCreateArgs>(args: SelectSubset<T, ArtistCreateArgs<ExtArgs>>): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Artists.
     * @param {ArtistCreateManyArgs} args - Arguments to create many Artists.
     * @example
     * // Create many Artists
     * const artist = await prisma.artist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArtistCreateManyArgs>(args?: SelectSubset<T, ArtistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Artists and returns the data saved in the database.
     * @param {ArtistCreateManyAndReturnArgs} args - Arguments to create many Artists.
     * @example
     * // Create many Artists
     * const artist = await prisma.artist.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Artists and only return the `id`
     * const artistWithIdOnly = await prisma.artist.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArtistCreateManyAndReturnArgs>(args?: SelectSubset<T, ArtistCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Artist.
     * @param {ArtistDeleteArgs} args - Arguments to delete one Artist.
     * @example
     * // Delete one Artist
     * const Artist = await prisma.artist.delete({
     *   where: {
     *     // ... filter to delete one Artist
     *   }
     * })
     * 
     */
    delete<T extends ArtistDeleteArgs>(args: SelectSubset<T, ArtistDeleteArgs<ExtArgs>>): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Artist.
     * @param {ArtistUpdateArgs} args - Arguments to update one Artist.
     * @example
     * // Update one Artist
     * const artist = await prisma.artist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArtistUpdateArgs>(args: SelectSubset<T, ArtistUpdateArgs<ExtArgs>>): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Artists.
     * @param {ArtistDeleteManyArgs} args - Arguments to filter Artists to delete.
     * @example
     * // Delete a few Artists
     * const { count } = await prisma.artist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArtistDeleteManyArgs>(args?: SelectSubset<T, ArtistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Artists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Artists
     * const artist = await prisma.artist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArtistUpdateManyArgs>(args: SelectSubset<T, ArtistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Artists and returns the data updated in the database.
     * @param {ArtistUpdateManyAndReturnArgs} args - Arguments to update many Artists.
     * @example
     * // Update many Artists
     * const artist = await prisma.artist.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Artists and only return the `id`
     * const artistWithIdOnly = await prisma.artist.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ArtistUpdateManyAndReturnArgs>(args: SelectSubset<T, ArtistUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Artist.
     * @param {ArtistUpsertArgs} args - Arguments to update or create a Artist.
     * @example
     * // Update or create a Artist
     * const artist = await prisma.artist.upsert({
     *   create: {
     *     // ... data to create a Artist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Artist we want to update
     *   }
     * })
     */
    upsert<T extends ArtistUpsertArgs>(args: SelectSubset<T, ArtistUpsertArgs<ExtArgs>>): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Artists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistCountArgs} args - Arguments to filter Artists to count.
     * @example
     * // Count the number of Artists
     * const count = await prisma.artist.count({
     *   where: {
     *     // ... the filter for the Artists we want to count
     *   }
     * })
    **/
    count<T extends ArtistCountArgs>(
      args?: Subset<T, ArtistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArtistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Artist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArtistAggregateArgs>(args: Subset<T, ArtistAggregateArgs>): Prisma.PrismaPromise<GetArtistAggregateType<T>>

    /**
     * Group by Artist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArtistGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ArtistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArtistGroupByArgs['orderBy'] }
        : { orderBy?: ArtistGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ArtistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArtistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Artist model
   */
  readonly fields: ArtistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Artist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArtistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    concerts<T extends Artist$concertsArgs<ExtArgs> = {}>(args?: Subset<T, Artist$concertsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConcertPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    followers<T extends Artist$followersArgs<ExtArgs> = {}>(args?: Subset<T, Artist$followersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserArtistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    setlists<T extends Artist$setlistsArgs<ExtArgs> = {}>(args?: Subset<T, Artist$setlistsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SetlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Artist model
   */
  interface ArtistFieldRefs {
    readonly id: FieldRef<"Artist", 'String'>
    readonly name: FieldRef<"Artist", 'String'>
    readonly image: FieldRef<"Artist", 'String'>
    readonly genre: FieldRef<"Artist", 'String'>
    readonly description: FieldRef<"Artist", 'String'>
    readonly spotifyArtistId: FieldRef<"Artist", 'String'>
    readonly followerCount: FieldRef<"Artist", 'Int'>
    readonly createdAt: FieldRef<"Artist", 'DateTime'>
    readonly updatedAt: FieldRef<"Artist", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Artist findUnique
   */
  export type ArtistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artist
     */
    omit?: ArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * Filter, which Artist to fetch.
     */
    where: ArtistWhereUniqueInput
  }

  /**
   * Artist findUniqueOrThrow
   */
  export type ArtistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artist
     */
    omit?: ArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * Filter, which Artist to fetch.
     */
    where: ArtistWhereUniqueInput
  }

  /**
   * Artist findFirst
   */
  export type ArtistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artist
     */
    omit?: ArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * Filter, which Artist to fetch.
     */
    where?: ArtistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Artists to fetch.
     */
    orderBy?: ArtistOrderByWithRelationInput | ArtistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Artists.
     */
    cursor?: ArtistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Artists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Artists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Artists.
     */
    distinct?: ArtistScalarFieldEnum | ArtistScalarFieldEnum[]
  }

  /**
   * Artist findFirstOrThrow
   */
  export type ArtistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artist
     */
    omit?: ArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * Filter, which Artist to fetch.
     */
    where?: ArtistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Artists to fetch.
     */
    orderBy?: ArtistOrderByWithRelationInput | ArtistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Artists.
     */
    cursor?: ArtistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Artists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Artists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Artists.
     */
    distinct?: ArtistScalarFieldEnum | ArtistScalarFieldEnum[]
  }

  /**
   * Artist findMany
   */
  export type ArtistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artist
     */
    omit?: ArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * Filter, which Artists to fetch.
     */
    where?: ArtistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Artists to fetch.
     */
    orderBy?: ArtistOrderByWithRelationInput | ArtistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Artists.
     */
    cursor?: ArtistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Artists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Artists.
     */
    skip?: number
    distinct?: ArtistScalarFieldEnum | ArtistScalarFieldEnum[]
  }

  /**
   * Artist create
   */
  export type ArtistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artist
     */
    omit?: ArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * The data needed to create a Artist.
     */
    data: XOR<ArtistCreateInput, ArtistUncheckedCreateInput>
  }

  /**
   * Artist createMany
   */
  export type ArtistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Artists.
     */
    data: ArtistCreateManyInput | ArtistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Artist createManyAndReturn
   */
  export type ArtistCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Artist
     */
    omit?: ArtistOmit<ExtArgs> | null
    /**
     * The data used to create many Artists.
     */
    data: ArtistCreateManyInput | ArtistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Artist update
   */
  export type ArtistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artist
     */
    omit?: ArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * The data needed to update a Artist.
     */
    data: XOR<ArtistUpdateInput, ArtistUncheckedUpdateInput>
    /**
     * Choose, which Artist to update.
     */
    where: ArtistWhereUniqueInput
  }

  /**
   * Artist updateMany
   */
  export type ArtistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Artists.
     */
    data: XOR<ArtistUpdateManyMutationInput, ArtistUncheckedUpdateManyInput>
    /**
     * Filter which Artists to update
     */
    where?: ArtistWhereInput
    /**
     * Limit how many Artists to update.
     */
    limit?: number
  }

  /**
   * Artist updateManyAndReturn
   */
  export type ArtistUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Artist
     */
    omit?: ArtistOmit<ExtArgs> | null
    /**
     * The data used to update Artists.
     */
    data: XOR<ArtistUpdateManyMutationInput, ArtistUncheckedUpdateManyInput>
    /**
     * Filter which Artists to update
     */
    where?: ArtistWhereInput
    /**
     * Limit how many Artists to update.
     */
    limit?: number
  }

  /**
   * Artist upsert
   */
  export type ArtistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artist
     */
    omit?: ArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * The filter to search for the Artist to update in case it exists.
     */
    where: ArtistWhereUniqueInput
    /**
     * In case the Artist found by the `where` argument doesn't exist, create a new Artist with this data.
     */
    create: XOR<ArtistCreateInput, ArtistUncheckedCreateInput>
    /**
     * In case the Artist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArtistUpdateInput, ArtistUncheckedUpdateInput>
  }

  /**
   * Artist delete
   */
  export type ArtistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artist
     */
    omit?: ArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtistInclude<ExtArgs> | null
    /**
     * Filter which Artist to delete.
     */
    where: ArtistWhereUniqueInput
  }

  /**
   * Artist deleteMany
   */
  export type ArtistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Artists to delete
     */
    where?: ArtistWhereInput
    /**
     * Limit how many Artists to delete.
     */
    limit?: number
  }

  /**
   * Artist.concerts
   */
  export type Artist$concertsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concert
     */
    select?: ConcertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concert
     */
    omit?: ConcertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcertInclude<ExtArgs> | null
    where?: ConcertWhereInput
    orderBy?: ConcertOrderByWithRelationInput | ConcertOrderByWithRelationInput[]
    cursor?: ConcertWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConcertScalarFieldEnum | ConcertScalarFieldEnum[]
  }

  /**
   * Artist.followers
   */
  export type Artist$followersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArtist
     */
    select?: UserArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserArtist
     */
    omit?: UserArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArtistInclude<ExtArgs> | null
    where?: UserArtistWhereInput
    orderBy?: UserArtistOrderByWithRelationInput | UserArtistOrderByWithRelationInput[]
    cursor?: UserArtistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserArtistScalarFieldEnum | UserArtistScalarFieldEnum[]
  }

  /**
   * Artist.setlists
   */
  export type Artist$setlistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setlist
     */
    select?: SetlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setlist
     */
    omit?: SetlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistInclude<ExtArgs> | null
    where?: SetlistWhereInput
    orderBy?: SetlistOrderByWithRelationInput | SetlistOrderByWithRelationInput[]
    cursor?: SetlistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SetlistScalarFieldEnum | SetlistScalarFieldEnum[]
  }

  /**
   * Artist without action
   */
  export type ArtistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artist
     */
    omit?: ArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtistInclude<ExtArgs> | null
  }


  /**
   * Model Concert
   */

  export type AggregateConcert = {
    _count: ConcertCountAggregateOutputType | null
    _avg: ConcertAvgAggregateOutputType | null
    _sum: ConcertSumAggregateOutputType | null
    _min: ConcertMinAggregateOutputType | null
    _max: ConcertMaxAggregateOutputType | null
  }

  export type ConcertAvgAggregateOutputType = {
    ticketPriceMin: number | null
    ticketPriceMax: number | null
  }

  export type ConcertSumAggregateOutputType = {
    ticketPriceMin: number | null
    ticketPriceMax: number | null
  }

  export type ConcertMinAggregateOutputType = {
    id: string | null
    kopisId: string | null
    title: string | null
    artistId: string | null
    poster: string | null
    date: Date | null
    venueName: string | null
    venueAddress: string | null
    venueMapLink: string | null
    region: string | null
    genre: string | null
    description: string | null
    ticketStatus: string | null
    ticketOpenDate: Date | null
    ticketPriceMin: number | null
    ticketPriceMax: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConcertMaxAggregateOutputType = {
    id: string | null
    kopisId: string | null
    title: string | null
    artistId: string | null
    poster: string | null
    date: Date | null
    venueName: string | null
    venueAddress: string | null
    venueMapLink: string | null
    region: string | null
    genre: string | null
    description: string | null
    ticketStatus: string | null
    ticketOpenDate: Date | null
    ticketPriceMin: number | null
    ticketPriceMax: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConcertCountAggregateOutputType = {
    id: number
    kopisId: number
    title: number
    artistId: number
    poster: number
    date: number
    venueName: number
    venueAddress: number
    venueMapLink: number
    region: number
    genre: number
    description: number
    ticketStatus: number
    ticketOpenDate: number
    ticketPriceMin: number
    ticketPriceMax: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ConcertAvgAggregateInputType = {
    ticketPriceMin?: true
    ticketPriceMax?: true
  }

  export type ConcertSumAggregateInputType = {
    ticketPriceMin?: true
    ticketPriceMax?: true
  }

  export type ConcertMinAggregateInputType = {
    id?: true
    kopisId?: true
    title?: true
    artistId?: true
    poster?: true
    date?: true
    venueName?: true
    venueAddress?: true
    venueMapLink?: true
    region?: true
    genre?: true
    description?: true
    ticketStatus?: true
    ticketOpenDate?: true
    ticketPriceMin?: true
    ticketPriceMax?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConcertMaxAggregateInputType = {
    id?: true
    kopisId?: true
    title?: true
    artistId?: true
    poster?: true
    date?: true
    venueName?: true
    venueAddress?: true
    venueMapLink?: true
    region?: true
    genre?: true
    description?: true
    ticketStatus?: true
    ticketOpenDate?: true
    ticketPriceMin?: true
    ticketPriceMax?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConcertCountAggregateInputType = {
    id?: true
    kopisId?: true
    title?: true
    artistId?: true
    poster?: true
    date?: true
    venueName?: true
    venueAddress?: true
    venueMapLink?: true
    region?: true
    genre?: true
    description?: true
    ticketStatus?: true
    ticketOpenDate?: true
    ticketPriceMin?: true
    ticketPriceMax?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ConcertAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Concert to aggregate.
     */
    where?: ConcertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Concerts to fetch.
     */
    orderBy?: ConcertOrderByWithRelationInput | ConcertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConcertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Concerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Concerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Concerts
    **/
    _count?: true | ConcertCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConcertAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConcertSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConcertMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConcertMaxAggregateInputType
  }

  export type GetConcertAggregateType<T extends ConcertAggregateArgs> = {
        [P in keyof T & keyof AggregateConcert]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConcert[P]>
      : GetScalarType<T[P], AggregateConcert[P]>
  }




  export type ConcertGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConcertWhereInput
    orderBy?: ConcertOrderByWithAggregationInput | ConcertOrderByWithAggregationInput[]
    by: ConcertScalarFieldEnum[] | ConcertScalarFieldEnum
    having?: ConcertScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConcertCountAggregateInputType | true
    _avg?: ConcertAvgAggregateInputType
    _sum?: ConcertSumAggregateInputType
    _min?: ConcertMinAggregateInputType
    _max?: ConcertMaxAggregateInputType
  }

  export type ConcertGroupByOutputType = {
    id: string
    kopisId: string | null
    title: string
    artistId: string | null
    poster: string | null
    date: Date
    venueName: string
    venueAddress: string | null
    venueMapLink: string | null
    region: string | null
    genre: string | null
    description: string | null
    ticketStatus: string | null
    ticketOpenDate: Date | null
    ticketPriceMin: number | null
    ticketPriceMax: number | null
    createdAt: Date
    updatedAt: Date
    _count: ConcertCountAggregateOutputType | null
    _avg: ConcertAvgAggregateOutputType | null
    _sum: ConcertSumAggregateOutputType | null
    _min: ConcertMinAggregateOutputType | null
    _max: ConcertMaxAggregateOutputType | null
  }

  type GetConcertGroupByPayload<T extends ConcertGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConcertGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConcertGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConcertGroupByOutputType[P]>
            : GetScalarType<T[P], ConcertGroupByOutputType[P]>
        }
      >
    >


  export type ConcertSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kopisId?: boolean
    title?: boolean
    artistId?: boolean
    poster?: boolean
    date?: boolean
    venueName?: boolean
    venueAddress?: boolean
    venueMapLink?: boolean
    region?: boolean
    genre?: boolean
    description?: boolean
    ticketStatus?: boolean
    ticketOpenDate?: boolean
    ticketPriceMin?: boolean
    ticketPriceMax?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    artist?: boolean | Concert$artistArgs<ExtArgs>
    bookingLinks?: boolean | Concert$bookingLinksArgs<ExtArgs>
    setlists?: boolean | Concert$setlistsArgs<ExtArgs>
    notifications?: boolean | Concert$notificationsArgs<ExtArgs>
    _count?: boolean | ConcertCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["concert"]>

  export type ConcertSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kopisId?: boolean
    title?: boolean
    artistId?: boolean
    poster?: boolean
    date?: boolean
    venueName?: boolean
    venueAddress?: boolean
    venueMapLink?: boolean
    region?: boolean
    genre?: boolean
    description?: boolean
    ticketStatus?: boolean
    ticketOpenDate?: boolean
    ticketPriceMin?: boolean
    ticketPriceMax?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    artist?: boolean | Concert$artistArgs<ExtArgs>
  }, ExtArgs["result"]["concert"]>

  export type ConcertSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kopisId?: boolean
    title?: boolean
    artistId?: boolean
    poster?: boolean
    date?: boolean
    venueName?: boolean
    venueAddress?: boolean
    venueMapLink?: boolean
    region?: boolean
    genre?: boolean
    description?: boolean
    ticketStatus?: boolean
    ticketOpenDate?: boolean
    ticketPriceMin?: boolean
    ticketPriceMax?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    artist?: boolean | Concert$artistArgs<ExtArgs>
  }, ExtArgs["result"]["concert"]>

  export type ConcertSelectScalar = {
    id?: boolean
    kopisId?: boolean
    title?: boolean
    artistId?: boolean
    poster?: boolean
    date?: boolean
    venueName?: boolean
    venueAddress?: boolean
    venueMapLink?: boolean
    region?: boolean
    genre?: boolean
    description?: boolean
    ticketStatus?: boolean
    ticketOpenDate?: boolean
    ticketPriceMin?: boolean
    ticketPriceMax?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ConcertOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "kopisId" | "title" | "artistId" | "poster" | "date" | "venueName" | "venueAddress" | "venueMapLink" | "region" | "genre" | "description" | "ticketStatus" | "ticketOpenDate" | "ticketPriceMin" | "ticketPriceMax" | "createdAt" | "updatedAt", ExtArgs["result"]["concert"]>
  export type ConcertInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    artist?: boolean | Concert$artistArgs<ExtArgs>
    bookingLinks?: boolean | Concert$bookingLinksArgs<ExtArgs>
    setlists?: boolean | Concert$setlistsArgs<ExtArgs>
    notifications?: boolean | Concert$notificationsArgs<ExtArgs>
    _count?: boolean | ConcertCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ConcertIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    artist?: boolean | Concert$artistArgs<ExtArgs>
  }
  export type ConcertIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    artist?: boolean | Concert$artistArgs<ExtArgs>
  }

  export type $ConcertPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Concert"
    objects: {
      artist: Prisma.$ArtistPayload<ExtArgs> | null
      bookingLinks: Prisma.$BookingLinkPayload<ExtArgs>[]
      setlists: Prisma.$SetlistPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      kopisId: string | null
      title: string
      artistId: string | null
      poster: string | null
      date: Date
      venueName: string
      venueAddress: string | null
      venueMapLink: string | null
      region: string | null
      genre: string | null
      description: string | null
      ticketStatus: string | null
      ticketOpenDate: Date | null
      ticketPriceMin: number | null
      ticketPriceMax: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["concert"]>
    composites: {}
  }

  type ConcertGetPayload<S extends boolean | null | undefined | ConcertDefaultArgs> = $Result.GetResult<Prisma.$ConcertPayload, S>

  type ConcertCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConcertFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConcertCountAggregateInputType | true
    }

  export interface ConcertDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Concert'], meta: { name: 'Concert' } }
    /**
     * Find zero or one Concert that matches the filter.
     * @param {ConcertFindUniqueArgs} args - Arguments to find a Concert
     * @example
     * // Get one Concert
     * const concert = await prisma.concert.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConcertFindUniqueArgs>(args: SelectSubset<T, ConcertFindUniqueArgs<ExtArgs>>): Prisma__ConcertClient<$Result.GetResult<Prisma.$ConcertPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Concert that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConcertFindUniqueOrThrowArgs} args - Arguments to find a Concert
     * @example
     * // Get one Concert
     * const concert = await prisma.concert.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConcertFindUniqueOrThrowArgs>(args: SelectSubset<T, ConcertFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConcertClient<$Result.GetResult<Prisma.$ConcertPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Concert that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcertFindFirstArgs} args - Arguments to find a Concert
     * @example
     * // Get one Concert
     * const concert = await prisma.concert.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConcertFindFirstArgs>(args?: SelectSubset<T, ConcertFindFirstArgs<ExtArgs>>): Prisma__ConcertClient<$Result.GetResult<Prisma.$ConcertPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Concert that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcertFindFirstOrThrowArgs} args - Arguments to find a Concert
     * @example
     * // Get one Concert
     * const concert = await prisma.concert.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConcertFindFirstOrThrowArgs>(args?: SelectSubset<T, ConcertFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConcertClient<$Result.GetResult<Prisma.$ConcertPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Concerts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcertFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Concerts
     * const concerts = await prisma.concert.findMany()
     * 
     * // Get first 10 Concerts
     * const concerts = await prisma.concert.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const concertWithIdOnly = await prisma.concert.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConcertFindManyArgs>(args?: SelectSubset<T, ConcertFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConcertPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Concert.
     * @param {ConcertCreateArgs} args - Arguments to create a Concert.
     * @example
     * // Create one Concert
     * const Concert = await prisma.concert.create({
     *   data: {
     *     // ... data to create a Concert
     *   }
     * })
     * 
     */
    create<T extends ConcertCreateArgs>(args: SelectSubset<T, ConcertCreateArgs<ExtArgs>>): Prisma__ConcertClient<$Result.GetResult<Prisma.$ConcertPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Concerts.
     * @param {ConcertCreateManyArgs} args - Arguments to create many Concerts.
     * @example
     * // Create many Concerts
     * const concert = await prisma.concert.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConcertCreateManyArgs>(args?: SelectSubset<T, ConcertCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Concerts and returns the data saved in the database.
     * @param {ConcertCreateManyAndReturnArgs} args - Arguments to create many Concerts.
     * @example
     * // Create many Concerts
     * const concert = await prisma.concert.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Concerts and only return the `id`
     * const concertWithIdOnly = await prisma.concert.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConcertCreateManyAndReturnArgs>(args?: SelectSubset<T, ConcertCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConcertPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Concert.
     * @param {ConcertDeleteArgs} args - Arguments to delete one Concert.
     * @example
     * // Delete one Concert
     * const Concert = await prisma.concert.delete({
     *   where: {
     *     // ... filter to delete one Concert
     *   }
     * })
     * 
     */
    delete<T extends ConcertDeleteArgs>(args: SelectSubset<T, ConcertDeleteArgs<ExtArgs>>): Prisma__ConcertClient<$Result.GetResult<Prisma.$ConcertPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Concert.
     * @param {ConcertUpdateArgs} args - Arguments to update one Concert.
     * @example
     * // Update one Concert
     * const concert = await prisma.concert.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConcertUpdateArgs>(args: SelectSubset<T, ConcertUpdateArgs<ExtArgs>>): Prisma__ConcertClient<$Result.GetResult<Prisma.$ConcertPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Concerts.
     * @param {ConcertDeleteManyArgs} args - Arguments to filter Concerts to delete.
     * @example
     * // Delete a few Concerts
     * const { count } = await prisma.concert.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConcertDeleteManyArgs>(args?: SelectSubset<T, ConcertDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Concerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcertUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Concerts
     * const concert = await prisma.concert.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConcertUpdateManyArgs>(args: SelectSubset<T, ConcertUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Concerts and returns the data updated in the database.
     * @param {ConcertUpdateManyAndReturnArgs} args - Arguments to update many Concerts.
     * @example
     * // Update many Concerts
     * const concert = await prisma.concert.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Concerts and only return the `id`
     * const concertWithIdOnly = await prisma.concert.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConcertUpdateManyAndReturnArgs>(args: SelectSubset<T, ConcertUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConcertPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Concert.
     * @param {ConcertUpsertArgs} args - Arguments to update or create a Concert.
     * @example
     * // Update or create a Concert
     * const concert = await prisma.concert.upsert({
     *   create: {
     *     // ... data to create a Concert
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Concert we want to update
     *   }
     * })
     */
    upsert<T extends ConcertUpsertArgs>(args: SelectSubset<T, ConcertUpsertArgs<ExtArgs>>): Prisma__ConcertClient<$Result.GetResult<Prisma.$ConcertPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Concerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcertCountArgs} args - Arguments to filter Concerts to count.
     * @example
     * // Count the number of Concerts
     * const count = await prisma.concert.count({
     *   where: {
     *     // ... the filter for the Concerts we want to count
     *   }
     * })
    **/
    count<T extends ConcertCountArgs>(
      args?: Subset<T, ConcertCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConcertCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Concert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcertAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConcertAggregateArgs>(args: Subset<T, ConcertAggregateArgs>): Prisma.PrismaPromise<GetConcertAggregateType<T>>

    /**
     * Group by Concert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcertGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConcertGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConcertGroupByArgs['orderBy'] }
        : { orderBy?: ConcertGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConcertGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConcertGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Concert model
   */
  readonly fields: ConcertFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Concert.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConcertClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    artist<T extends Concert$artistArgs<ExtArgs> = {}>(args?: Subset<T, Concert$artistArgs<ExtArgs>>): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    bookingLinks<T extends Concert$bookingLinksArgs<ExtArgs> = {}>(args?: Subset<T, Concert$bookingLinksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    setlists<T extends Concert$setlistsArgs<ExtArgs> = {}>(args?: Subset<T, Concert$setlistsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SetlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends Concert$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, Concert$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Concert model
   */
  interface ConcertFieldRefs {
    readonly id: FieldRef<"Concert", 'String'>
    readonly kopisId: FieldRef<"Concert", 'String'>
    readonly title: FieldRef<"Concert", 'String'>
    readonly artistId: FieldRef<"Concert", 'String'>
    readonly poster: FieldRef<"Concert", 'String'>
    readonly date: FieldRef<"Concert", 'DateTime'>
    readonly venueName: FieldRef<"Concert", 'String'>
    readonly venueAddress: FieldRef<"Concert", 'String'>
    readonly venueMapLink: FieldRef<"Concert", 'String'>
    readonly region: FieldRef<"Concert", 'String'>
    readonly genre: FieldRef<"Concert", 'String'>
    readonly description: FieldRef<"Concert", 'String'>
    readonly ticketStatus: FieldRef<"Concert", 'String'>
    readonly ticketOpenDate: FieldRef<"Concert", 'DateTime'>
    readonly ticketPriceMin: FieldRef<"Concert", 'Int'>
    readonly ticketPriceMax: FieldRef<"Concert", 'Int'>
    readonly createdAt: FieldRef<"Concert", 'DateTime'>
    readonly updatedAt: FieldRef<"Concert", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Concert findUnique
   */
  export type ConcertFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concert
     */
    select?: ConcertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concert
     */
    omit?: ConcertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcertInclude<ExtArgs> | null
    /**
     * Filter, which Concert to fetch.
     */
    where: ConcertWhereUniqueInput
  }

  /**
   * Concert findUniqueOrThrow
   */
  export type ConcertFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concert
     */
    select?: ConcertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concert
     */
    omit?: ConcertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcertInclude<ExtArgs> | null
    /**
     * Filter, which Concert to fetch.
     */
    where: ConcertWhereUniqueInput
  }

  /**
   * Concert findFirst
   */
  export type ConcertFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concert
     */
    select?: ConcertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concert
     */
    omit?: ConcertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcertInclude<ExtArgs> | null
    /**
     * Filter, which Concert to fetch.
     */
    where?: ConcertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Concerts to fetch.
     */
    orderBy?: ConcertOrderByWithRelationInput | ConcertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Concerts.
     */
    cursor?: ConcertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Concerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Concerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Concerts.
     */
    distinct?: ConcertScalarFieldEnum | ConcertScalarFieldEnum[]
  }

  /**
   * Concert findFirstOrThrow
   */
  export type ConcertFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concert
     */
    select?: ConcertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concert
     */
    omit?: ConcertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcertInclude<ExtArgs> | null
    /**
     * Filter, which Concert to fetch.
     */
    where?: ConcertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Concerts to fetch.
     */
    orderBy?: ConcertOrderByWithRelationInput | ConcertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Concerts.
     */
    cursor?: ConcertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Concerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Concerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Concerts.
     */
    distinct?: ConcertScalarFieldEnum | ConcertScalarFieldEnum[]
  }

  /**
   * Concert findMany
   */
  export type ConcertFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concert
     */
    select?: ConcertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concert
     */
    omit?: ConcertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcertInclude<ExtArgs> | null
    /**
     * Filter, which Concerts to fetch.
     */
    where?: ConcertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Concerts to fetch.
     */
    orderBy?: ConcertOrderByWithRelationInput | ConcertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Concerts.
     */
    cursor?: ConcertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Concerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Concerts.
     */
    skip?: number
    distinct?: ConcertScalarFieldEnum | ConcertScalarFieldEnum[]
  }

  /**
   * Concert create
   */
  export type ConcertCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concert
     */
    select?: ConcertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concert
     */
    omit?: ConcertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcertInclude<ExtArgs> | null
    /**
     * The data needed to create a Concert.
     */
    data: XOR<ConcertCreateInput, ConcertUncheckedCreateInput>
  }

  /**
   * Concert createMany
   */
  export type ConcertCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Concerts.
     */
    data: ConcertCreateManyInput | ConcertCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Concert createManyAndReturn
   */
  export type ConcertCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concert
     */
    select?: ConcertSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Concert
     */
    omit?: ConcertOmit<ExtArgs> | null
    /**
     * The data used to create many Concerts.
     */
    data: ConcertCreateManyInput | ConcertCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcertIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Concert update
   */
  export type ConcertUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concert
     */
    select?: ConcertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concert
     */
    omit?: ConcertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcertInclude<ExtArgs> | null
    /**
     * The data needed to update a Concert.
     */
    data: XOR<ConcertUpdateInput, ConcertUncheckedUpdateInput>
    /**
     * Choose, which Concert to update.
     */
    where: ConcertWhereUniqueInput
  }

  /**
   * Concert updateMany
   */
  export type ConcertUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Concerts.
     */
    data: XOR<ConcertUpdateManyMutationInput, ConcertUncheckedUpdateManyInput>
    /**
     * Filter which Concerts to update
     */
    where?: ConcertWhereInput
    /**
     * Limit how many Concerts to update.
     */
    limit?: number
  }

  /**
   * Concert updateManyAndReturn
   */
  export type ConcertUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concert
     */
    select?: ConcertSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Concert
     */
    omit?: ConcertOmit<ExtArgs> | null
    /**
     * The data used to update Concerts.
     */
    data: XOR<ConcertUpdateManyMutationInput, ConcertUncheckedUpdateManyInput>
    /**
     * Filter which Concerts to update
     */
    where?: ConcertWhereInput
    /**
     * Limit how many Concerts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcertIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Concert upsert
   */
  export type ConcertUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concert
     */
    select?: ConcertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concert
     */
    omit?: ConcertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcertInclude<ExtArgs> | null
    /**
     * The filter to search for the Concert to update in case it exists.
     */
    where: ConcertWhereUniqueInput
    /**
     * In case the Concert found by the `where` argument doesn't exist, create a new Concert with this data.
     */
    create: XOR<ConcertCreateInput, ConcertUncheckedCreateInput>
    /**
     * In case the Concert was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConcertUpdateInput, ConcertUncheckedUpdateInput>
  }

  /**
   * Concert delete
   */
  export type ConcertDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concert
     */
    select?: ConcertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concert
     */
    omit?: ConcertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcertInclude<ExtArgs> | null
    /**
     * Filter which Concert to delete.
     */
    where: ConcertWhereUniqueInput
  }

  /**
   * Concert deleteMany
   */
  export type ConcertDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Concerts to delete
     */
    where?: ConcertWhereInput
    /**
     * Limit how many Concerts to delete.
     */
    limit?: number
  }

  /**
   * Concert.artist
   */
  export type Concert$artistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artist
     */
    omit?: ArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtistInclude<ExtArgs> | null
    where?: ArtistWhereInput
  }

  /**
   * Concert.bookingLinks
   */
  export type Concert$bookingLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingLink
     */
    select?: BookingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingLink
     */
    omit?: BookingLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingLinkInclude<ExtArgs> | null
    where?: BookingLinkWhereInput
    orderBy?: BookingLinkOrderByWithRelationInput | BookingLinkOrderByWithRelationInput[]
    cursor?: BookingLinkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingLinkScalarFieldEnum | BookingLinkScalarFieldEnum[]
  }

  /**
   * Concert.setlists
   */
  export type Concert$setlistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setlist
     */
    select?: SetlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setlist
     */
    omit?: SetlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistInclude<ExtArgs> | null
    where?: SetlistWhereInput
    orderBy?: SetlistOrderByWithRelationInput | SetlistOrderByWithRelationInput[]
    cursor?: SetlistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SetlistScalarFieldEnum | SetlistScalarFieldEnum[]
  }

  /**
   * Concert.notifications
   */
  export type Concert$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Concert without action
   */
  export type ConcertDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concert
     */
    select?: ConcertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concert
     */
    omit?: ConcertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcertInclude<ExtArgs> | null
  }


  /**
   * Model BookingLink
   */

  export type AggregateBookingLink = {
    _count: BookingLinkCountAggregateOutputType | null
    _avg: BookingLinkAvgAggregateOutputType | null
    _sum: BookingLinkSumAggregateOutputType | null
    _min: BookingLinkMinAggregateOutputType | null
    _max: BookingLinkMaxAggregateOutputType | null
  }

  export type BookingLinkAvgAggregateOutputType = {
    id: number | null
  }

  export type BookingLinkSumAggregateOutputType = {
    id: number | null
  }

  export type BookingLinkMinAggregateOutputType = {
    id: number | null
    concertId: string | null
    platform: string | null
    url: string | null
    createdAt: Date | null
  }

  export type BookingLinkMaxAggregateOutputType = {
    id: number | null
    concertId: string | null
    platform: string | null
    url: string | null
    createdAt: Date | null
  }

  export type BookingLinkCountAggregateOutputType = {
    id: number
    concertId: number
    platform: number
    url: number
    createdAt: number
    _all: number
  }


  export type BookingLinkAvgAggregateInputType = {
    id?: true
  }

  export type BookingLinkSumAggregateInputType = {
    id?: true
  }

  export type BookingLinkMinAggregateInputType = {
    id?: true
    concertId?: true
    platform?: true
    url?: true
    createdAt?: true
  }

  export type BookingLinkMaxAggregateInputType = {
    id?: true
    concertId?: true
    platform?: true
    url?: true
    createdAt?: true
  }

  export type BookingLinkCountAggregateInputType = {
    id?: true
    concertId?: true
    platform?: true
    url?: true
    createdAt?: true
    _all?: true
  }

  export type BookingLinkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookingLink to aggregate.
     */
    where?: BookingLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookingLinks to fetch.
     */
    orderBy?: BookingLinkOrderByWithRelationInput | BookingLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookingLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookingLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookingLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BookingLinks
    **/
    _count?: true | BookingLinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookingLinkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookingLinkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingLinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingLinkMaxAggregateInputType
  }

  export type GetBookingLinkAggregateType<T extends BookingLinkAggregateArgs> = {
        [P in keyof T & keyof AggregateBookingLink]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookingLink[P]>
      : GetScalarType<T[P], AggregateBookingLink[P]>
  }




  export type BookingLinkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingLinkWhereInput
    orderBy?: BookingLinkOrderByWithAggregationInput | BookingLinkOrderByWithAggregationInput[]
    by: BookingLinkScalarFieldEnum[] | BookingLinkScalarFieldEnum
    having?: BookingLinkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingLinkCountAggregateInputType | true
    _avg?: BookingLinkAvgAggregateInputType
    _sum?: BookingLinkSumAggregateInputType
    _min?: BookingLinkMinAggregateInputType
    _max?: BookingLinkMaxAggregateInputType
  }

  export type BookingLinkGroupByOutputType = {
    id: number
    concertId: string
    platform: string
    url: string
    createdAt: Date
    _count: BookingLinkCountAggregateOutputType | null
    _avg: BookingLinkAvgAggregateOutputType | null
    _sum: BookingLinkSumAggregateOutputType | null
    _min: BookingLinkMinAggregateOutputType | null
    _max: BookingLinkMaxAggregateOutputType | null
  }

  type GetBookingLinkGroupByPayload<T extends BookingLinkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookingLinkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingLinkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingLinkGroupByOutputType[P]>
            : GetScalarType<T[P], BookingLinkGroupByOutputType[P]>
        }
      >
    >


  export type BookingLinkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    concertId?: boolean
    platform?: boolean
    url?: boolean
    createdAt?: boolean
    concert?: boolean | ConcertDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookingLink"]>

  export type BookingLinkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    concertId?: boolean
    platform?: boolean
    url?: boolean
    createdAt?: boolean
    concert?: boolean | ConcertDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookingLink"]>

  export type BookingLinkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    concertId?: boolean
    platform?: boolean
    url?: boolean
    createdAt?: boolean
    concert?: boolean | ConcertDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookingLink"]>

  export type BookingLinkSelectScalar = {
    id?: boolean
    concertId?: boolean
    platform?: boolean
    url?: boolean
    createdAt?: boolean
  }

  export type BookingLinkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "concertId" | "platform" | "url" | "createdAt", ExtArgs["result"]["bookingLink"]>
  export type BookingLinkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    concert?: boolean | ConcertDefaultArgs<ExtArgs>
  }
  export type BookingLinkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    concert?: boolean | ConcertDefaultArgs<ExtArgs>
  }
  export type BookingLinkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    concert?: boolean | ConcertDefaultArgs<ExtArgs>
  }

  export type $BookingLinkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BookingLink"
    objects: {
      concert: Prisma.$ConcertPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      concertId: string
      platform: string
      url: string
      createdAt: Date
    }, ExtArgs["result"]["bookingLink"]>
    composites: {}
  }

  type BookingLinkGetPayload<S extends boolean | null | undefined | BookingLinkDefaultArgs> = $Result.GetResult<Prisma.$BookingLinkPayload, S>

  type BookingLinkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookingLinkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookingLinkCountAggregateInputType | true
    }

  export interface BookingLinkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BookingLink'], meta: { name: 'BookingLink' } }
    /**
     * Find zero or one BookingLink that matches the filter.
     * @param {BookingLinkFindUniqueArgs} args - Arguments to find a BookingLink
     * @example
     * // Get one BookingLink
     * const bookingLink = await prisma.bookingLink.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookingLinkFindUniqueArgs>(args: SelectSubset<T, BookingLinkFindUniqueArgs<ExtArgs>>): Prisma__BookingLinkClient<$Result.GetResult<Prisma.$BookingLinkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BookingLink that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookingLinkFindUniqueOrThrowArgs} args - Arguments to find a BookingLink
     * @example
     * // Get one BookingLink
     * const bookingLink = await prisma.bookingLink.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookingLinkFindUniqueOrThrowArgs>(args: SelectSubset<T, BookingLinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookingLinkClient<$Result.GetResult<Prisma.$BookingLinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BookingLink that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingLinkFindFirstArgs} args - Arguments to find a BookingLink
     * @example
     * // Get one BookingLink
     * const bookingLink = await prisma.bookingLink.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookingLinkFindFirstArgs>(args?: SelectSubset<T, BookingLinkFindFirstArgs<ExtArgs>>): Prisma__BookingLinkClient<$Result.GetResult<Prisma.$BookingLinkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BookingLink that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingLinkFindFirstOrThrowArgs} args - Arguments to find a BookingLink
     * @example
     * // Get one BookingLink
     * const bookingLink = await prisma.bookingLink.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookingLinkFindFirstOrThrowArgs>(args?: SelectSubset<T, BookingLinkFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookingLinkClient<$Result.GetResult<Prisma.$BookingLinkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BookingLinks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingLinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BookingLinks
     * const bookingLinks = await prisma.bookingLink.findMany()
     * 
     * // Get first 10 BookingLinks
     * const bookingLinks = await prisma.bookingLink.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingLinkWithIdOnly = await prisma.bookingLink.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookingLinkFindManyArgs>(args?: SelectSubset<T, BookingLinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BookingLink.
     * @param {BookingLinkCreateArgs} args - Arguments to create a BookingLink.
     * @example
     * // Create one BookingLink
     * const BookingLink = await prisma.bookingLink.create({
     *   data: {
     *     // ... data to create a BookingLink
     *   }
     * })
     * 
     */
    create<T extends BookingLinkCreateArgs>(args: SelectSubset<T, BookingLinkCreateArgs<ExtArgs>>): Prisma__BookingLinkClient<$Result.GetResult<Prisma.$BookingLinkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BookingLinks.
     * @param {BookingLinkCreateManyArgs} args - Arguments to create many BookingLinks.
     * @example
     * // Create many BookingLinks
     * const bookingLink = await prisma.bookingLink.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookingLinkCreateManyArgs>(args?: SelectSubset<T, BookingLinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BookingLinks and returns the data saved in the database.
     * @param {BookingLinkCreateManyAndReturnArgs} args - Arguments to create many BookingLinks.
     * @example
     * // Create many BookingLinks
     * const bookingLink = await prisma.bookingLink.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BookingLinks and only return the `id`
     * const bookingLinkWithIdOnly = await prisma.bookingLink.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookingLinkCreateManyAndReturnArgs>(args?: SelectSubset<T, BookingLinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingLinkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BookingLink.
     * @param {BookingLinkDeleteArgs} args - Arguments to delete one BookingLink.
     * @example
     * // Delete one BookingLink
     * const BookingLink = await prisma.bookingLink.delete({
     *   where: {
     *     // ... filter to delete one BookingLink
     *   }
     * })
     * 
     */
    delete<T extends BookingLinkDeleteArgs>(args: SelectSubset<T, BookingLinkDeleteArgs<ExtArgs>>): Prisma__BookingLinkClient<$Result.GetResult<Prisma.$BookingLinkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BookingLink.
     * @param {BookingLinkUpdateArgs} args - Arguments to update one BookingLink.
     * @example
     * // Update one BookingLink
     * const bookingLink = await prisma.bookingLink.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookingLinkUpdateArgs>(args: SelectSubset<T, BookingLinkUpdateArgs<ExtArgs>>): Prisma__BookingLinkClient<$Result.GetResult<Prisma.$BookingLinkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BookingLinks.
     * @param {BookingLinkDeleteManyArgs} args - Arguments to filter BookingLinks to delete.
     * @example
     * // Delete a few BookingLinks
     * const { count } = await prisma.bookingLink.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookingLinkDeleteManyArgs>(args?: SelectSubset<T, BookingLinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookingLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingLinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BookingLinks
     * const bookingLink = await prisma.bookingLink.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookingLinkUpdateManyArgs>(args: SelectSubset<T, BookingLinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookingLinks and returns the data updated in the database.
     * @param {BookingLinkUpdateManyAndReturnArgs} args - Arguments to update many BookingLinks.
     * @example
     * // Update many BookingLinks
     * const bookingLink = await prisma.bookingLink.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BookingLinks and only return the `id`
     * const bookingLinkWithIdOnly = await prisma.bookingLink.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookingLinkUpdateManyAndReturnArgs>(args: SelectSubset<T, BookingLinkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingLinkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BookingLink.
     * @param {BookingLinkUpsertArgs} args - Arguments to update or create a BookingLink.
     * @example
     * // Update or create a BookingLink
     * const bookingLink = await prisma.bookingLink.upsert({
     *   create: {
     *     // ... data to create a BookingLink
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BookingLink we want to update
     *   }
     * })
     */
    upsert<T extends BookingLinkUpsertArgs>(args: SelectSubset<T, BookingLinkUpsertArgs<ExtArgs>>): Prisma__BookingLinkClient<$Result.GetResult<Prisma.$BookingLinkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BookingLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingLinkCountArgs} args - Arguments to filter BookingLinks to count.
     * @example
     * // Count the number of BookingLinks
     * const count = await prisma.bookingLink.count({
     *   where: {
     *     // ... the filter for the BookingLinks we want to count
     *   }
     * })
    **/
    count<T extends BookingLinkCountArgs>(
      args?: Subset<T, BookingLinkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingLinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BookingLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingLinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookingLinkAggregateArgs>(args: Subset<T, BookingLinkAggregateArgs>): Prisma.PrismaPromise<GetBookingLinkAggregateType<T>>

    /**
     * Group by BookingLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingLinkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookingLinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookingLinkGroupByArgs['orderBy'] }
        : { orderBy?: BookingLinkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookingLinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BookingLink model
   */
  readonly fields: BookingLinkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BookingLink.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookingLinkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    concert<T extends ConcertDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConcertDefaultArgs<ExtArgs>>): Prisma__ConcertClient<$Result.GetResult<Prisma.$ConcertPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BookingLink model
   */
  interface BookingLinkFieldRefs {
    readonly id: FieldRef<"BookingLink", 'Int'>
    readonly concertId: FieldRef<"BookingLink", 'String'>
    readonly platform: FieldRef<"BookingLink", 'String'>
    readonly url: FieldRef<"BookingLink", 'String'>
    readonly createdAt: FieldRef<"BookingLink", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BookingLink findUnique
   */
  export type BookingLinkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingLink
     */
    select?: BookingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingLink
     */
    omit?: BookingLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingLinkInclude<ExtArgs> | null
    /**
     * Filter, which BookingLink to fetch.
     */
    where: BookingLinkWhereUniqueInput
  }

  /**
   * BookingLink findUniqueOrThrow
   */
  export type BookingLinkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingLink
     */
    select?: BookingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingLink
     */
    omit?: BookingLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingLinkInclude<ExtArgs> | null
    /**
     * Filter, which BookingLink to fetch.
     */
    where: BookingLinkWhereUniqueInput
  }

  /**
   * BookingLink findFirst
   */
  export type BookingLinkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingLink
     */
    select?: BookingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingLink
     */
    omit?: BookingLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingLinkInclude<ExtArgs> | null
    /**
     * Filter, which BookingLink to fetch.
     */
    where?: BookingLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookingLinks to fetch.
     */
    orderBy?: BookingLinkOrderByWithRelationInput | BookingLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookingLinks.
     */
    cursor?: BookingLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookingLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookingLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookingLinks.
     */
    distinct?: BookingLinkScalarFieldEnum | BookingLinkScalarFieldEnum[]
  }

  /**
   * BookingLink findFirstOrThrow
   */
  export type BookingLinkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingLink
     */
    select?: BookingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingLink
     */
    omit?: BookingLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingLinkInclude<ExtArgs> | null
    /**
     * Filter, which BookingLink to fetch.
     */
    where?: BookingLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookingLinks to fetch.
     */
    orderBy?: BookingLinkOrderByWithRelationInput | BookingLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookingLinks.
     */
    cursor?: BookingLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookingLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookingLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookingLinks.
     */
    distinct?: BookingLinkScalarFieldEnum | BookingLinkScalarFieldEnum[]
  }

  /**
   * BookingLink findMany
   */
  export type BookingLinkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingLink
     */
    select?: BookingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingLink
     */
    omit?: BookingLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingLinkInclude<ExtArgs> | null
    /**
     * Filter, which BookingLinks to fetch.
     */
    where?: BookingLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookingLinks to fetch.
     */
    orderBy?: BookingLinkOrderByWithRelationInput | BookingLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BookingLinks.
     */
    cursor?: BookingLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookingLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookingLinks.
     */
    skip?: number
    distinct?: BookingLinkScalarFieldEnum | BookingLinkScalarFieldEnum[]
  }

  /**
   * BookingLink create
   */
  export type BookingLinkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingLink
     */
    select?: BookingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingLink
     */
    omit?: BookingLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingLinkInclude<ExtArgs> | null
    /**
     * The data needed to create a BookingLink.
     */
    data: XOR<BookingLinkCreateInput, BookingLinkUncheckedCreateInput>
  }

  /**
   * BookingLink createMany
   */
  export type BookingLinkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BookingLinks.
     */
    data: BookingLinkCreateManyInput | BookingLinkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BookingLink createManyAndReturn
   */
  export type BookingLinkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingLink
     */
    select?: BookingLinkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BookingLink
     */
    omit?: BookingLinkOmit<ExtArgs> | null
    /**
     * The data used to create many BookingLinks.
     */
    data: BookingLinkCreateManyInput | BookingLinkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingLinkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BookingLink update
   */
  export type BookingLinkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingLink
     */
    select?: BookingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingLink
     */
    omit?: BookingLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingLinkInclude<ExtArgs> | null
    /**
     * The data needed to update a BookingLink.
     */
    data: XOR<BookingLinkUpdateInput, BookingLinkUncheckedUpdateInput>
    /**
     * Choose, which BookingLink to update.
     */
    where: BookingLinkWhereUniqueInput
  }

  /**
   * BookingLink updateMany
   */
  export type BookingLinkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BookingLinks.
     */
    data: XOR<BookingLinkUpdateManyMutationInput, BookingLinkUncheckedUpdateManyInput>
    /**
     * Filter which BookingLinks to update
     */
    where?: BookingLinkWhereInput
    /**
     * Limit how many BookingLinks to update.
     */
    limit?: number
  }

  /**
   * BookingLink updateManyAndReturn
   */
  export type BookingLinkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingLink
     */
    select?: BookingLinkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BookingLink
     */
    omit?: BookingLinkOmit<ExtArgs> | null
    /**
     * The data used to update BookingLinks.
     */
    data: XOR<BookingLinkUpdateManyMutationInput, BookingLinkUncheckedUpdateManyInput>
    /**
     * Filter which BookingLinks to update
     */
    where?: BookingLinkWhereInput
    /**
     * Limit how many BookingLinks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingLinkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BookingLink upsert
   */
  export type BookingLinkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingLink
     */
    select?: BookingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingLink
     */
    omit?: BookingLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingLinkInclude<ExtArgs> | null
    /**
     * The filter to search for the BookingLink to update in case it exists.
     */
    where: BookingLinkWhereUniqueInput
    /**
     * In case the BookingLink found by the `where` argument doesn't exist, create a new BookingLink with this data.
     */
    create: XOR<BookingLinkCreateInput, BookingLinkUncheckedCreateInput>
    /**
     * In case the BookingLink was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookingLinkUpdateInput, BookingLinkUncheckedUpdateInput>
  }

  /**
   * BookingLink delete
   */
  export type BookingLinkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingLink
     */
    select?: BookingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingLink
     */
    omit?: BookingLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingLinkInclude<ExtArgs> | null
    /**
     * Filter which BookingLink to delete.
     */
    where: BookingLinkWhereUniqueInput
  }

  /**
   * BookingLink deleteMany
   */
  export type BookingLinkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookingLinks to delete
     */
    where?: BookingLinkWhereInput
    /**
     * Limit how many BookingLinks to delete.
     */
    limit?: number
  }

  /**
   * BookingLink without action
   */
  export type BookingLinkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingLink
     */
    select?: BookingLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookingLink
     */
    omit?: BookingLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingLinkInclude<ExtArgs> | null
  }


  /**
   * Model UserArtist
   */

  export type AggregateUserArtist = {
    _count: UserArtistCountAggregateOutputType | null
    _avg: UserArtistAvgAggregateOutputType | null
    _sum: UserArtistSumAggregateOutputType | null
    _min: UserArtistMinAggregateOutputType | null
    _max: UserArtistMaxAggregateOutputType | null
  }

  export type UserArtistAvgAggregateOutputType = {
    id: number | null
  }

  export type UserArtistSumAggregateOutputType = {
    id: number | null
  }

  export type UserArtistMinAggregateOutputType = {
    id: number | null
    userId: string | null
    artistId: string | null
    createdAt: Date | null
  }

  export type UserArtistMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    artistId: string | null
    createdAt: Date | null
  }

  export type UserArtistCountAggregateOutputType = {
    id: number
    userId: number
    artistId: number
    createdAt: number
    _all: number
  }


  export type UserArtistAvgAggregateInputType = {
    id?: true
  }

  export type UserArtistSumAggregateInputType = {
    id?: true
  }

  export type UserArtistMinAggregateInputType = {
    id?: true
    userId?: true
    artistId?: true
    createdAt?: true
  }

  export type UserArtistMaxAggregateInputType = {
    id?: true
    userId?: true
    artistId?: true
    createdAt?: true
  }

  export type UserArtistCountAggregateInputType = {
    id?: true
    userId?: true
    artistId?: true
    createdAt?: true
    _all?: true
  }

  export type UserArtistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserArtist to aggregate.
     */
    where?: UserArtistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserArtists to fetch.
     */
    orderBy?: UserArtistOrderByWithRelationInput | UserArtistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserArtistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserArtists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserArtists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserArtists
    **/
    _count?: true | UserArtistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserArtistAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserArtistSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserArtistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserArtistMaxAggregateInputType
  }

  export type GetUserArtistAggregateType<T extends UserArtistAggregateArgs> = {
        [P in keyof T & keyof AggregateUserArtist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserArtist[P]>
      : GetScalarType<T[P], AggregateUserArtist[P]>
  }




  export type UserArtistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserArtistWhereInput
    orderBy?: UserArtistOrderByWithAggregationInput | UserArtistOrderByWithAggregationInput[]
    by: UserArtistScalarFieldEnum[] | UserArtistScalarFieldEnum
    having?: UserArtistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserArtistCountAggregateInputType | true
    _avg?: UserArtistAvgAggregateInputType
    _sum?: UserArtistSumAggregateInputType
    _min?: UserArtistMinAggregateInputType
    _max?: UserArtistMaxAggregateInputType
  }

  export type UserArtistGroupByOutputType = {
    id: number
    userId: string
    artistId: string
    createdAt: Date
    _count: UserArtistCountAggregateOutputType | null
    _avg: UserArtistAvgAggregateOutputType | null
    _sum: UserArtistSumAggregateOutputType | null
    _min: UserArtistMinAggregateOutputType | null
    _max: UserArtistMaxAggregateOutputType | null
  }

  type GetUserArtistGroupByPayload<T extends UserArtistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserArtistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserArtistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserArtistGroupByOutputType[P]>
            : GetScalarType<T[P], UserArtistGroupByOutputType[P]>
        }
      >
    >


  export type UserArtistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    artistId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    artist?: boolean | ArtistDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userArtist"]>

  export type UserArtistSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    artistId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    artist?: boolean | ArtistDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userArtist"]>

  export type UserArtistSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    artistId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    artist?: boolean | ArtistDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userArtist"]>

  export type UserArtistSelectScalar = {
    id?: boolean
    userId?: boolean
    artistId?: boolean
    createdAt?: boolean
  }

  export type UserArtistOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "artistId" | "createdAt", ExtArgs["result"]["userArtist"]>
  export type UserArtistInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    artist?: boolean | ArtistDefaultArgs<ExtArgs>
  }
  export type UserArtistIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    artist?: boolean | ArtistDefaultArgs<ExtArgs>
  }
  export type UserArtistIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    artist?: boolean | ArtistDefaultArgs<ExtArgs>
  }

  export type $UserArtistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserArtist"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      artist: Prisma.$ArtistPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      artistId: string
      createdAt: Date
    }, ExtArgs["result"]["userArtist"]>
    composites: {}
  }

  type UserArtistGetPayload<S extends boolean | null | undefined | UserArtistDefaultArgs> = $Result.GetResult<Prisma.$UserArtistPayload, S>

  type UserArtistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserArtistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserArtistCountAggregateInputType | true
    }

  export interface UserArtistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserArtist'], meta: { name: 'UserArtist' } }
    /**
     * Find zero or one UserArtist that matches the filter.
     * @param {UserArtistFindUniqueArgs} args - Arguments to find a UserArtist
     * @example
     * // Get one UserArtist
     * const userArtist = await prisma.userArtist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserArtistFindUniqueArgs>(args: SelectSubset<T, UserArtistFindUniqueArgs<ExtArgs>>): Prisma__UserArtistClient<$Result.GetResult<Prisma.$UserArtistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserArtist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserArtistFindUniqueOrThrowArgs} args - Arguments to find a UserArtist
     * @example
     * // Get one UserArtist
     * const userArtist = await prisma.userArtist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserArtistFindUniqueOrThrowArgs>(args: SelectSubset<T, UserArtistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserArtistClient<$Result.GetResult<Prisma.$UserArtistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserArtist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserArtistFindFirstArgs} args - Arguments to find a UserArtist
     * @example
     * // Get one UserArtist
     * const userArtist = await prisma.userArtist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserArtistFindFirstArgs>(args?: SelectSubset<T, UserArtistFindFirstArgs<ExtArgs>>): Prisma__UserArtistClient<$Result.GetResult<Prisma.$UserArtistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserArtist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserArtistFindFirstOrThrowArgs} args - Arguments to find a UserArtist
     * @example
     * // Get one UserArtist
     * const userArtist = await prisma.userArtist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserArtistFindFirstOrThrowArgs>(args?: SelectSubset<T, UserArtistFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserArtistClient<$Result.GetResult<Prisma.$UserArtistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserArtists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserArtistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserArtists
     * const userArtists = await prisma.userArtist.findMany()
     * 
     * // Get first 10 UserArtists
     * const userArtists = await prisma.userArtist.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userArtistWithIdOnly = await prisma.userArtist.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserArtistFindManyArgs>(args?: SelectSubset<T, UserArtistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserArtistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserArtist.
     * @param {UserArtistCreateArgs} args - Arguments to create a UserArtist.
     * @example
     * // Create one UserArtist
     * const UserArtist = await prisma.userArtist.create({
     *   data: {
     *     // ... data to create a UserArtist
     *   }
     * })
     * 
     */
    create<T extends UserArtistCreateArgs>(args: SelectSubset<T, UserArtistCreateArgs<ExtArgs>>): Prisma__UserArtistClient<$Result.GetResult<Prisma.$UserArtistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserArtists.
     * @param {UserArtistCreateManyArgs} args - Arguments to create many UserArtists.
     * @example
     * // Create many UserArtists
     * const userArtist = await prisma.userArtist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserArtistCreateManyArgs>(args?: SelectSubset<T, UserArtistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserArtists and returns the data saved in the database.
     * @param {UserArtistCreateManyAndReturnArgs} args - Arguments to create many UserArtists.
     * @example
     * // Create many UserArtists
     * const userArtist = await prisma.userArtist.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserArtists and only return the `id`
     * const userArtistWithIdOnly = await prisma.userArtist.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserArtistCreateManyAndReturnArgs>(args?: SelectSubset<T, UserArtistCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserArtistPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserArtist.
     * @param {UserArtistDeleteArgs} args - Arguments to delete one UserArtist.
     * @example
     * // Delete one UserArtist
     * const UserArtist = await prisma.userArtist.delete({
     *   where: {
     *     // ... filter to delete one UserArtist
     *   }
     * })
     * 
     */
    delete<T extends UserArtistDeleteArgs>(args: SelectSubset<T, UserArtistDeleteArgs<ExtArgs>>): Prisma__UserArtistClient<$Result.GetResult<Prisma.$UserArtistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserArtist.
     * @param {UserArtistUpdateArgs} args - Arguments to update one UserArtist.
     * @example
     * // Update one UserArtist
     * const userArtist = await prisma.userArtist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserArtistUpdateArgs>(args: SelectSubset<T, UserArtistUpdateArgs<ExtArgs>>): Prisma__UserArtistClient<$Result.GetResult<Prisma.$UserArtistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserArtists.
     * @param {UserArtistDeleteManyArgs} args - Arguments to filter UserArtists to delete.
     * @example
     * // Delete a few UserArtists
     * const { count } = await prisma.userArtist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserArtistDeleteManyArgs>(args?: SelectSubset<T, UserArtistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserArtists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserArtistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserArtists
     * const userArtist = await prisma.userArtist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserArtistUpdateManyArgs>(args: SelectSubset<T, UserArtistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserArtists and returns the data updated in the database.
     * @param {UserArtistUpdateManyAndReturnArgs} args - Arguments to update many UserArtists.
     * @example
     * // Update many UserArtists
     * const userArtist = await prisma.userArtist.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserArtists and only return the `id`
     * const userArtistWithIdOnly = await prisma.userArtist.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserArtistUpdateManyAndReturnArgs>(args: SelectSubset<T, UserArtistUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserArtistPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserArtist.
     * @param {UserArtistUpsertArgs} args - Arguments to update or create a UserArtist.
     * @example
     * // Update or create a UserArtist
     * const userArtist = await prisma.userArtist.upsert({
     *   create: {
     *     // ... data to create a UserArtist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserArtist we want to update
     *   }
     * })
     */
    upsert<T extends UserArtistUpsertArgs>(args: SelectSubset<T, UserArtistUpsertArgs<ExtArgs>>): Prisma__UserArtistClient<$Result.GetResult<Prisma.$UserArtistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserArtists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserArtistCountArgs} args - Arguments to filter UserArtists to count.
     * @example
     * // Count the number of UserArtists
     * const count = await prisma.userArtist.count({
     *   where: {
     *     // ... the filter for the UserArtists we want to count
     *   }
     * })
    **/
    count<T extends UserArtistCountArgs>(
      args?: Subset<T, UserArtistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserArtistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserArtist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserArtistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserArtistAggregateArgs>(args: Subset<T, UserArtistAggregateArgs>): Prisma.PrismaPromise<GetUserArtistAggregateType<T>>

    /**
     * Group by UserArtist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserArtistGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserArtistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserArtistGroupByArgs['orderBy'] }
        : { orderBy?: UserArtistGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserArtistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserArtistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserArtist model
   */
  readonly fields: UserArtistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserArtist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserArtistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    artist<T extends ArtistDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ArtistDefaultArgs<ExtArgs>>): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserArtist model
   */
  interface UserArtistFieldRefs {
    readonly id: FieldRef<"UserArtist", 'Int'>
    readonly userId: FieldRef<"UserArtist", 'String'>
    readonly artistId: FieldRef<"UserArtist", 'String'>
    readonly createdAt: FieldRef<"UserArtist", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserArtist findUnique
   */
  export type UserArtistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArtist
     */
    select?: UserArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserArtist
     */
    omit?: UserArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArtistInclude<ExtArgs> | null
    /**
     * Filter, which UserArtist to fetch.
     */
    where: UserArtistWhereUniqueInput
  }

  /**
   * UserArtist findUniqueOrThrow
   */
  export type UserArtistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArtist
     */
    select?: UserArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserArtist
     */
    omit?: UserArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArtistInclude<ExtArgs> | null
    /**
     * Filter, which UserArtist to fetch.
     */
    where: UserArtistWhereUniqueInput
  }

  /**
   * UserArtist findFirst
   */
  export type UserArtistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArtist
     */
    select?: UserArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserArtist
     */
    omit?: UserArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArtistInclude<ExtArgs> | null
    /**
     * Filter, which UserArtist to fetch.
     */
    where?: UserArtistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserArtists to fetch.
     */
    orderBy?: UserArtistOrderByWithRelationInput | UserArtistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserArtists.
     */
    cursor?: UserArtistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserArtists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserArtists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserArtists.
     */
    distinct?: UserArtistScalarFieldEnum | UserArtistScalarFieldEnum[]
  }

  /**
   * UserArtist findFirstOrThrow
   */
  export type UserArtistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArtist
     */
    select?: UserArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserArtist
     */
    omit?: UserArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArtistInclude<ExtArgs> | null
    /**
     * Filter, which UserArtist to fetch.
     */
    where?: UserArtistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserArtists to fetch.
     */
    orderBy?: UserArtistOrderByWithRelationInput | UserArtistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserArtists.
     */
    cursor?: UserArtistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserArtists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserArtists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserArtists.
     */
    distinct?: UserArtistScalarFieldEnum | UserArtistScalarFieldEnum[]
  }

  /**
   * UserArtist findMany
   */
  export type UserArtistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArtist
     */
    select?: UserArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserArtist
     */
    omit?: UserArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArtistInclude<ExtArgs> | null
    /**
     * Filter, which UserArtists to fetch.
     */
    where?: UserArtistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserArtists to fetch.
     */
    orderBy?: UserArtistOrderByWithRelationInput | UserArtistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserArtists.
     */
    cursor?: UserArtistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserArtists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserArtists.
     */
    skip?: number
    distinct?: UserArtistScalarFieldEnum | UserArtistScalarFieldEnum[]
  }

  /**
   * UserArtist create
   */
  export type UserArtistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArtist
     */
    select?: UserArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserArtist
     */
    omit?: UserArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArtistInclude<ExtArgs> | null
    /**
     * The data needed to create a UserArtist.
     */
    data: XOR<UserArtistCreateInput, UserArtistUncheckedCreateInput>
  }

  /**
   * UserArtist createMany
   */
  export type UserArtistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserArtists.
     */
    data: UserArtistCreateManyInput | UserArtistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserArtist createManyAndReturn
   */
  export type UserArtistCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArtist
     */
    select?: UserArtistSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserArtist
     */
    omit?: UserArtistOmit<ExtArgs> | null
    /**
     * The data used to create many UserArtists.
     */
    data: UserArtistCreateManyInput | UserArtistCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArtistIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserArtist update
   */
  export type UserArtistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArtist
     */
    select?: UserArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserArtist
     */
    omit?: UserArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArtistInclude<ExtArgs> | null
    /**
     * The data needed to update a UserArtist.
     */
    data: XOR<UserArtistUpdateInput, UserArtistUncheckedUpdateInput>
    /**
     * Choose, which UserArtist to update.
     */
    where: UserArtistWhereUniqueInput
  }

  /**
   * UserArtist updateMany
   */
  export type UserArtistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserArtists.
     */
    data: XOR<UserArtistUpdateManyMutationInput, UserArtistUncheckedUpdateManyInput>
    /**
     * Filter which UserArtists to update
     */
    where?: UserArtistWhereInput
    /**
     * Limit how many UserArtists to update.
     */
    limit?: number
  }

  /**
   * UserArtist updateManyAndReturn
   */
  export type UserArtistUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArtist
     */
    select?: UserArtistSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserArtist
     */
    omit?: UserArtistOmit<ExtArgs> | null
    /**
     * The data used to update UserArtists.
     */
    data: XOR<UserArtistUpdateManyMutationInput, UserArtistUncheckedUpdateManyInput>
    /**
     * Filter which UserArtists to update
     */
    where?: UserArtistWhereInput
    /**
     * Limit how many UserArtists to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArtistIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserArtist upsert
   */
  export type UserArtistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArtist
     */
    select?: UserArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserArtist
     */
    omit?: UserArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArtistInclude<ExtArgs> | null
    /**
     * The filter to search for the UserArtist to update in case it exists.
     */
    where: UserArtistWhereUniqueInput
    /**
     * In case the UserArtist found by the `where` argument doesn't exist, create a new UserArtist with this data.
     */
    create: XOR<UserArtistCreateInput, UserArtistUncheckedCreateInput>
    /**
     * In case the UserArtist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserArtistUpdateInput, UserArtistUncheckedUpdateInput>
  }

  /**
   * UserArtist delete
   */
  export type UserArtistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArtist
     */
    select?: UserArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserArtist
     */
    omit?: UserArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArtistInclude<ExtArgs> | null
    /**
     * Filter which UserArtist to delete.
     */
    where: UserArtistWhereUniqueInput
  }

  /**
   * UserArtist deleteMany
   */
  export type UserArtistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserArtists to delete
     */
    where?: UserArtistWhereInput
    /**
     * Limit how many UserArtists to delete.
     */
    limit?: number
  }

  /**
   * UserArtist without action
   */
  export type UserArtistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserArtist
     */
    select?: UserArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserArtist
     */
    omit?: UserArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserArtistInclude<ExtArgs> | null
  }


  /**
   * Model Setlist
   */

  export type AggregateSetlist = {
    _count: SetlistCountAggregateOutputType | null
    _min: SetlistMinAggregateOutputType | null
    _max: SetlistMaxAggregateOutputType | null
  }

  export type SetlistMinAggregateOutputType = {
    id: string | null
    concertId: string | null
    artistId: string | null
    date: Date | null
    venue: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SetlistMaxAggregateOutputType = {
    id: string | null
    concertId: string | null
    artistId: string | null
    date: Date | null
    venue: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SetlistCountAggregateOutputType = {
    id: number
    concertId: number
    artistId: number
    date: number
    venue: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SetlistMinAggregateInputType = {
    id?: true
    concertId?: true
    artistId?: true
    date?: true
    venue?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SetlistMaxAggregateInputType = {
    id?: true
    concertId?: true
    artistId?: true
    date?: true
    venue?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SetlistCountAggregateInputType = {
    id?: true
    concertId?: true
    artistId?: true
    date?: true
    venue?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SetlistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Setlist to aggregate.
     */
    where?: SetlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Setlists to fetch.
     */
    orderBy?: SetlistOrderByWithRelationInput | SetlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SetlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Setlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Setlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Setlists
    **/
    _count?: true | SetlistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SetlistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SetlistMaxAggregateInputType
  }

  export type GetSetlistAggregateType<T extends SetlistAggregateArgs> = {
        [P in keyof T & keyof AggregateSetlist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSetlist[P]>
      : GetScalarType<T[P], AggregateSetlist[P]>
  }




  export type SetlistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SetlistWhereInput
    orderBy?: SetlistOrderByWithAggregationInput | SetlistOrderByWithAggregationInput[]
    by: SetlistScalarFieldEnum[] | SetlistScalarFieldEnum
    having?: SetlistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SetlistCountAggregateInputType | true
    _min?: SetlistMinAggregateInputType
    _max?: SetlistMaxAggregateInputType
  }

  export type SetlistGroupByOutputType = {
    id: string
    concertId: string | null
    artistId: string | null
    date: Date | null
    venue: string | null
    createdAt: Date
    updatedAt: Date
    _count: SetlistCountAggregateOutputType | null
    _min: SetlistMinAggregateOutputType | null
    _max: SetlistMaxAggregateOutputType | null
  }

  type GetSetlistGroupByPayload<T extends SetlistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SetlistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SetlistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SetlistGroupByOutputType[P]>
            : GetScalarType<T[P], SetlistGroupByOutputType[P]>
        }
      >
    >


  export type SetlistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    concertId?: boolean
    artistId?: boolean
    date?: boolean
    venue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    concert?: boolean | Setlist$concertArgs<ExtArgs>
    artist?: boolean | Setlist$artistArgs<ExtArgs>
    tracks?: boolean | Setlist$tracksArgs<ExtArgs>
    _count?: boolean | SetlistCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["setlist"]>

  export type SetlistSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    concertId?: boolean
    artistId?: boolean
    date?: boolean
    venue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    concert?: boolean | Setlist$concertArgs<ExtArgs>
    artist?: boolean | Setlist$artistArgs<ExtArgs>
  }, ExtArgs["result"]["setlist"]>

  export type SetlistSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    concertId?: boolean
    artistId?: boolean
    date?: boolean
    venue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    concert?: boolean | Setlist$concertArgs<ExtArgs>
    artist?: boolean | Setlist$artistArgs<ExtArgs>
  }, ExtArgs["result"]["setlist"]>

  export type SetlistSelectScalar = {
    id?: boolean
    concertId?: boolean
    artistId?: boolean
    date?: boolean
    venue?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SetlistOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "concertId" | "artistId" | "date" | "venue" | "createdAt" | "updatedAt", ExtArgs["result"]["setlist"]>
  export type SetlistInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    concert?: boolean | Setlist$concertArgs<ExtArgs>
    artist?: boolean | Setlist$artistArgs<ExtArgs>
    tracks?: boolean | Setlist$tracksArgs<ExtArgs>
    _count?: boolean | SetlistCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SetlistIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    concert?: boolean | Setlist$concertArgs<ExtArgs>
    artist?: boolean | Setlist$artistArgs<ExtArgs>
  }
  export type SetlistIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    concert?: boolean | Setlist$concertArgs<ExtArgs>
    artist?: boolean | Setlist$artistArgs<ExtArgs>
  }

  export type $SetlistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Setlist"
    objects: {
      concert: Prisma.$ConcertPayload<ExtArgs> | null
      artist: Prisma.$ArtistPayload<ExtArgs> | null
      tracks: Prisma.$SetlistTrackPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      concertId: string | null
      artistId: string | null
      date: Date | null
      venue: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["setlist"]>
    composites: {}
  }

  type SetlistGetPayload<S extends boolean | null | undefined | SetlistDefaultArgs> = $Result.GetResult<Prisma.$SetlistPayload, S>

  type SetlistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SetlistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SetlistCountAggregateInputType | true
    }

  export interface SetlistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Setlist'], meta: { name: 'Setlist' } }
    /**
     * Find zero or one Setlist that matches the filter.
     * @param {SetlistFindUniqueArgs} args - Arguments to find a Setlist
     * @example
     * // Get one Setlist
     * const setlist = await prisma.setlist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SetlistFindUniqueArgs>(args: SelectSubset<T, SetlistFindUniqueArgs<ExtArgs>>): Prisma__SetlistClient<$Result.GetResult<Prisma.$SetlistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Setlist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SetlistFindUniqueOrThrowArgs} args - Arguments to find a Setlist
     * @example
     * // Get one Setlist
     * const setlist = await prisma.setlist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SetlistFindUniqueOrThrowArgs>(args: SelectSubset<T, SetlistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SetlistClient<$Result.GetResult<Prisma.$SetlistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Setlist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetlistFindFirstArgs} args - Arguments to find a Setlist
     * @example
     * // Get one Setlist
     * const setlist = await prisma.setlist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SetlistFindFirstArgs>(args?: SelectSubset<T, SetlistFindFirstArgs<ExtArgs>>): Prisma__SetlistClient<$Result.GetResult<Prisma.$SetlistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Setlist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetlistFindFirstOrThrowArgs} args - Arguments to find a Setlist
     * @example
     * // Get one Setlist
     * const setlist = await prisma.setlist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SetlistFindFirstOrThrowArgs>(args?: SelectSubset<T, SetlistFindFirstOrThrowArgs<ExtArgs>>): Prisma__SetlistClient<$Result.GetResult<Prisma.$SetlistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Setlists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetlistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Setlists
     * const setlists = await prisma.setlist.findMany()
     * 
     * // Get first 10 Setlists
     * const setlists = await prisma.setlist.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const setlistWithIdOnly = await prisma.setlist.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SetlistFindManyArgs>(args?: SelectSubset<T, SetlistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SetlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Setlist.
     * @param {SetlistCreateArgs} args - Arguments to create a Setlist.
     * @example
     * // Create one Setlist
     * const Setlist = await prisma.setlist.create({
     *   data: {
     *     // ... data to create a Setlist
     *   }
     * })
     * 
     */
    create<T extends SetlistCreateArgs>(args: SelectSubset<T, SetlistCreateArgs<ExtArgs>>): Prisma__SetlistClient<$Result.GetResult<Prisma.$SetlistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Setlists.
     * @param {SetlistCreateManyArgs} args - Arguments to create many Setlists.
     * @example
     * // Create many Setlists
     * const setlist = await prisma.setlist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SetlistCreateManyArgs>(args?: SelectSubset<T, SetlistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Setlists and returns the data saved in the database.
     * @param {SetlistCreateManyAndReturnArgs} args - Arguments to create many Setlists.
     * @example
     * // Create many Setlists
     * const setlist = await prisma.setlist.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Setlists and only return the `id`
     * const setlistWithIdOnly = await prisma.setlist.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SetlistCreateManyAndReturnArgs>(args?: SelectSubset<T, SetlistCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SetlistPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Setlist.
     * @param {SetlistDeleteArgs} args - Arguments to delete one Setlist.
     * @example
     * // Delete one Setlist
     * const Setlist = await prisma.setlist.delete({
     *   where: {
     *     // ... filter to delete one Setlist
     *   }
     * })
     * 
     */
    delete<T extends SetlistDeleteArgs>(args: SelectSubset<T, SetlistDeleteArgs<ExtArgs>>): Prisma__SetlistClient<$Result.GetResult<Prisma.$SetlistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Setlist.
     * @param {SetlistUpdateArgs} args - Arguments to update one Setlist.
     * @example
     * // Update one Setlist
     * const setlist = await prisma.setlist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SetlistUpdateArgs>(args: SelectSubset<T, SetlistUpdateArgs<ExtArgs>>): Prisma__SetlistClient<$Result.GetResult<Prisma.$SetlistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Setlists.
     * @param {SetlistDeleteManyArgs} args - Arguments to filter Setlists to delete.
     * @example
     * // Delete a few Setlists
     * const { count } = await prisma.setlist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SetlistDeleteManyArgs>(args?: SelectSubset<T, SetlistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Setlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetlistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Setlists
     * const setlist = await prisma.setlist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SetlistUpdateManyArgs>(args: SelectSubset<T, SetlistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Setlists and returns the data updated in the database.
     * @param {SetlistUpdateManyAndReturnArgs} args - Arguments to update many Setlists.
     * @example
     * // Update many Setlists
     * const setlist = await prisma.setlist.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Setlists and only return the `id`
     * const setlistWithIdOnly = await prisma.setlist.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SetlistUpdateManyAndReturnArgs>(args: SelectSubset<T, SetlistUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SetlistPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Setlist.
     * @param {SetlistUpsertArgs} args - Arguments to update or create a Setlist.
     * @example
     * // Update or create a Setlist
     * const setlist = await prisma.setlist.upsert({
     *   create: {
     *     // ... data to create a Setlist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Setlist we want to update
     *   }
     * })
     */
    upsert<T extends SetlistUpsertArgs>(args: SelectSubset<T, SetlistUpsertArgs<ExtArgs>>): Prisma__SetlistClient<$Result.GetResult<Prisma.$SetlistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Setlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetlistCountArgs} args - Arguments to filter Setlists to count.
     * @example
     * // Count the number of Setlists
     * const count = await prisma.setlist.count({
     *   where: {
     *     // ... the filter for the Setlists we want to count
     *   }
     * })
    **/
    count<T extends SetlistCountArgs>(
      args?: Subset<T, SetlistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SetlistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Setlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetlistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SetlistAggregateArgs>(args: Subset<T, SetlistAggregateArgs>): Prisma.PrismaPromise<GetSetlistAggregateType<T>>

    /**
     * Group by Setlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetlistGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SetlistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SetlistGroupByArgs['orderBy'] }
        : { orderBy?: SetlistGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SetlistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSetlistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Setlist model
   */
  readonly fields: SetlistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Setlist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SetlistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    concert<T extends Setlist$concertArgs<ExtArgs> = {}>(args?: Subset<T, Setlist$concertArgs<ExtArgs>>): Prisma__ConcertClient<$Result.GetResult<Prisma.$ConcertPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    artist<T extends Setlist$artistArgs<ExtArgs> = {}>(args?: Subset<T, Setlist$artistArgs<ExtArgs>>): Prisma__ArtistClient<$Result.GetResult<Prisma.$ArtistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    tracks<T extends Setlist$tracksArgs<ExtArgs> = {}>(args?: Subset<T, Setlist$tracksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SetlistTrackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Setlist model
   */
  interface SetlistFieldRefs {
    readonly id: FieldRef<"Setlist", 'String'>
    readonly concertId: FieldRef<"Setlist", 'String'>
    readonly artistId: FieldRef<"Setlist", 'String'>
    readonly date: FieldRef<"Setlist", 'DateTime'>
    readonly venue: FieldRef<"Setlist", 'String'>
    readonly createdAt: FieldRef<"Setlist", 'DateTime'>
    readonly updatedAt: FieldRef<"Setlist", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Setlist findUnique
   */
  export type SetlistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setlist
     */
    select?: SetlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setlist
     */
    omit?: SetlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistInclude<ExtArgs> | null
    /**
     * Filter, which Setlist to fetch.
     */
    where: SetlistWhereUniqueInput
  }

  /**
   * Setlist findUniqueOrThrow
   */
  export type SetlistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setlist
     */
    select?: SetlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setlist
     */
    omit?: SetlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistInclude<ExtArgs> | null
    /**
     * Filter, which Setlist to fetch.
     */
    where: SetlistWhereUniqueInput
  }

  /**
   * Setlist findFirst
   */
  export type SetlistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setlist
     */
    select?: SetlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setlist
     */
    omit?: SetlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistInclude<ExtArgs> | null
    /**
     * Filter, which Setlist to fetch.
     */
    where?: SetlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Setlists to fetch.
     */
    orderBy?: SetlistOrderByWithRelationInput | SetlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Setlists.
     */
    cursor?: SetlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Setlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Setlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Setlists.
     */
    distinct?: SetlistScalarFieldEnum | SetlistScalarFieldEnum[]
  }

  /**
   * Setlist findFirstOrThrow
   */
  export type SetlistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setlist
     */
    select?: SetlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setlist
     */
    omit?: SetlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistInclude<ExtArgs> | null
    /**
     * Filter, which Setlist to fetch.
     */
    where?: SetlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Setlists to fetch.
     */
    orderBy?: SetlistOrderByWithRelationInput | SetlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Setlists.
     */
    cursor?: SetlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Setlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Setlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Setlists.
     */
    distinct?: SetlistScalarFieldEnum | SetlistScalarFieldEnum[]
  }

  /**
   * Setlist findMany
   */
  export type SetlistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setlist
     */
    select?: SetlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setlist
     */
    omit?: SetlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistInclude<ExtArgs> | null
    /**
     * Filter, which Setlists to fetch.
     */
    where?: SetlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Setlists to fetch.
     */
    orderBy?: SetlistOrderByWithRelationInput | SetlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Setlists.
     */
    cursor?: SetlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Setlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Setlists.
     */
    skip?: number
    distinct?: SetlistScalarFieldEnum | SetlistScalarFieldEnum[]
  }

  /**
   * Setlist create
   */
  export type SetlistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setlist
     */
    select?: SetlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setlist
     */
    omit?: SetlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistInclude<ExtArgs> | null
    /**
     * The data needed to create a Setlist.
     */
    data: XOR<SetlistCreateInput, SetlistUncheckedCreateInput>
  }

  /**
   * Setlist createMany
   */
  export type SetlistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Setlists.
     */
    data: SetlistCreateManyInput | SetlistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Setlist createManyAndReturn
   */
  export type SetlistCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setlist
     */
    select?: SetlistSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Setlist
     */
    omit?: SetlistOmit<ExtArgs> | null
    /**
     * The data used to create many Setlists.
     */
    data: SetlistCreateManyInput | SetlistCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Setlist update
   */
  export type SetlistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setlist
     */
    select?: SetlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setlist
     */
    omit?: SetlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistInclude<ExtArgs> | null
    /**
     * The data needed to update a Setlist.
     */
    data: XOR<SetlistUpdateInput, SetlistUncheckedUpdateInput>
    /**
     * Choose, which Setlist to update.
     */
    where: SetlistWhereUniqueInput
  }

  /**
   * Setlist updateMany
   */
  export type SetlistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Setlists.
     */
    data: XOR<SetlistUpdateManyMutationInput, SetlistUncheckedUpdateManyInput>
    /**
     * Filter which Setlists to update
     */
    where?: SetlistWhereInput
    /**
     * Limit how many Setlists to update.
     */
    limit?: number
  }

  /**
   * Setlist updateManyAndReturn
   */
  export type SetlistUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setlist
     */
    select?: SetlistSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Setlist
     */
    omit?: SetlistOmit<ExtArgs> | null
    /**
     * The data used to update Setlists.
     */
    data: XOR<SetlistUpdateManyMutationInput, SetlistUncheckedUpdateManyInput>
    /**
     * Filter which Setlists to update
     */
    where?: SetlistWhereInput
    /**
     * Limit how many Setlists to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Setlist upsert
   */
  export type SetlistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setlist
     */
    select?: SetlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setlist
     */
    omit?: SetlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistInclude<ExtArgs> | null
    /**
     * The filter to search for the Setlist to update in case it exists.
     */
    where: SetlistWhereUniqueInput
    /**
     * In case the Setlist found by the `where` argument doesn't exist, create a new Setlist with this data.
     */
    create: XOR<SetlistCreateInput, SetlistUncheckedCreateInput>
    /**
     * In case the Setlist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SetlistUpdateInput, SetlistUncheckedUpdateInput>
  }

  /**
   * Setlist delete
   */
  export type SetlistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setlist
     */
    select?: SetlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setlist
     */
    omit?: SetlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistInclude<ExtArgs> | null
    /**
     * Filter which Setlist to delete.
     */
    where: SetlistWhereUniqueInput
  }

  /**
   * Setlist deleteMany
   */
  export type SetlistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Setlists to delete
     */
    where?: SetlistWhereInput
    /**
     * Limit how many Setlists to delete.
     */
    limit?: number
  }

  /**
   * Setlist.concert
   */
  export type Setlist$concertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concert
     */
    select?: ConcertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concert
     */
    omit?: ConcertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcertInclude<ExtArgs> | null
    where?: ConcertWhereInput
  }

  /**
   * Setlist.artist
   */
  export type Setlist$artistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Artist
     */
    select?: ArtistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Artist
     */
    omit?: ArtistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArtistInclude<ExtArgs> | null
    where?: ArtistWhereInput
  }

  /**
   * Setlist.tracks
   */
  export type Setlist$tracksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SetlistTrack
     */
    select?: SetlistTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SetlistTrack
     */
    omit?: SetlistTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistTrackInclude<ExtArgs> | null
    where?: SetlistTrackWhereInput
    orderBy?: SetlistTrackOrderByWithRelationInput | SetlistTrackOrderByWithRelationInput[]
    cursor?: SetlistTrackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SetlistTrackScalarFieldEnum | SetlistTrackScalarFieldEnum[]
  }

  /**
   * Setlist without action
   */
  export type SetlistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setlist
     */
    select?: SetlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setlist
     */
    omit?: SetlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistInclude<ExtArgs> | null
  }


  /**
   * Model SetlistTrack
   */

  export type AggregateSetlistTrack = {
    _count: SetlistTrackCountAggregateOutputType | null
    _avg: SetlistTrackAvgAggregateOutputType | null
    _sum: SetlistTrackSumAggregateOutputType | null
    _min: SetlistTrackMinAggregateOutputType | null
    _max: SetlistTrackMaxAggregateOutputType | null
  }

  export type SetlistTrackAvgAggregateOutputType = {
    id: number | null
    orderNumber: number | null
    duration: number | null
  }

  export type SetlistTrackSumAggregateOutputType = {
    id: number | null
    orderNumber: number | null
    duration: number | null
  }

  export type SetlistTrackMinAggregateOutputType = {
    id: number | null
    setlistId: string | null
    orderNumber: number | null
    title: string | null
    spotifyTrackId: string | null
    duration: number | null
    createdAt: Date | null
  }

  export type SetlistTrackMaxAggregateOutputType = {
    id: number | null
    setlistId: string | null
    orderNumber: number | null
    title: string | null
    spotifyTrackId: string | null
    duration: number | null
    createdAt: Date | null
  }

  export type SetlistTrackCountAggregateOutputType = {
    id: number
    setlistId: number
    orderNumber: number
    title: number
    spotifyTrackId: number
    duration: number
    createdAt: number
    _all: number
  }


  export type SetlistTrackAvgAggregateInputType = {
    id?: true
    orderNumber?: true
    duration?: true
  }

  export type SetlistTrackSumAggregateInputType = {
    id?: true
    orderNumber?: true
    duration?: true
  }

  export type SetlistTrackMinAggregateInputType = {
    id?: true
    setlistId?: true
    orderNumber?: true
    title?: true
    spotifyTrackId?: true
    duration?: true
    createdAt?: true
  }

  export type SetlistTrackMaxAggregateInputType = {
    id?: true
    setlistId?: true
    orderNumber?: true
    title?: true
    spotifyTrackId?: true
    duration?: true
    createdAt?: true
  }

  export type SetlistTrackCountAggregateInputType = {
    id?: true
    setlistId?: true
    orderNumber?: true
    title?: true
    spotifyTrackId?: true
    duration?: true
    createdAt?: true
    _all?: true
  }

  export type SetlistTrackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SetlistTrack to aggregate.
     */
    where?: SetlistTrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SetlistTracks to fetch.
     */
    orderBy?: SetlistTrackOrderByWithRelationInput | SetlistTrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SetlistTrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SetlistTracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SetlistTracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SetlistTracks
    **/
    _count?: true | SetlistTrackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SetlistTrackAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SetlistTrackSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SetlistTrackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SetlistTrackMaxAggregateInputType
  }

  export type GetSetlistTrackAggregateType<T extends SetlistTrackAggregateArgs> = {
        [P in keyof T & keyof AggregateSetlistTrack]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSetlistTrack[P]>
      : GetScalarType<T[P], AggregateSetlistTrack[P]>
  }




  export type SetlistTrackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SetlistTrackWhereInput
    orderBy?: SetlistTrackOrderByWithAggregationInput | SetlistTrackOrderByWithAggregationInput[]
    by: SetlistTrackScalarFieldEnum[] | SetlistTrackScalarFieldEnum
    having?: SetlistTrackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SetlistTrackCountAggregateInputType | true
    _avg?: SetlistTrackAvgAggregateInputType
    _sum?: SetlistTrackSumAggregateInputType
    _min?: SetlistTrackMinAggregateInputType
    _max?: SetlistTrackMaxAggregateInputType
  }

  export type SetlistTrackGroupByOutputType = {
    id: number
    setlistId: string
    orderNumber: number
    title: string
    spotifyTrackId: string | null
    duration: number | null
    createdAt: Date
    _count: SetlistTrackCountAggregateOutputType | null
    _avg: SetlistTrackAvgAggregateOutputType | null
    _sum: SetlistTrackSumAggregateOutputType | null
    _min: SetlistTrackMinAggregateOutputType | null
    _max: SetlistTrackMaxAggregateOutputType | null
  }

  type GetSetlistTrackGroupByPayload<T extends SetlistTrackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SetlistTrackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SetlistTrackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SetlistTrackGroupByOutputType[P]>
            : GetScalarType<T[P], SetlistTrackGroupByOutputType[P]>
        }
      >
    >


  export type SetlistTrackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    setlistId?: boolean
    orderNumber?: boolean
    title?: boolean
    spotifyTrackId?: boolean
    duration?: boolean
    createdAt?: boolean
    setlist?: boolean | SetlistDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["setlistTrack"]>

  export type SetlistTrackSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    setlistId?: boolean
    orderNumber?: boolean
    title?: boolean
    spotifyTrackId?: boolean
    duration?: boolean
    createdAt?: boolean
    setlist?: boolean | SetlistDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["setlistTrack"]>

  export type SetlistTrackSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    setlistId?: boolean
    orderNumber?: boolean
    title?: boolean
    spotifyTrackId?: boolean
    duration?: boolean
    createdAt?: boolean
    setlist?: boolean | SetlistDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["setlistTrack"]>

  export type SetlistTrackSelectScalar = {
    id?: boolean
    setlistId?: boolean
    orderNumber?: boolean
    title?: boolean
    spotifyTrackId?: boolean
    duration?: boolean
    createdAt?: boolean
  }

  export type SetlistTrackOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "setlistId" | "orderNumber" | "title" | "spotifyTrackId" | "duration" | "createdAt", ExtArgs["result"]["setlistTrack"]>
  export type SetlistTrackInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    setlist?: boolean | SetlistDefaultArgs<ExtArgs>
  }
  export type SetlistTrackIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    setlist?: boolean | SetlistDefaultArgs<ExtArgs>
  }
  export type SetlistTrackIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    setlist?: boolean | SetlistDefaultArgs<ExtArgs>
  }

  export type $SetlistTrackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SetlistTrack"
    objects: {
      setlist: Prisma.$SetlistPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      setlistId: string
      orderNumber: number
      title: string
      spotifyTrackId: string | null
      duration: number | null
      createdAt: Date
    }, ExtArgs["result"]["setlistTrack"]>
    composites: {}
  }

  type SetlistTrackGetPayload<S extends boolean | null | undefined | SetlistTrackDefaultArgs> = $Result.GetResult<Prisma.$SetlistTrackPayload, S>

  type SetlistTrackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SetlistTrackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SetlistTrackCountAggregateInputType | true
    }

  export interface SetlistTrackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SetlistTrack'], meta: { name: 'SetlistTrack' } }
    /**
     * Find zero or one SetlistTrack that matches the filter.
     * @param {SetlistTrackFindUniqueArgs} args - Arguments to find a SetlistTrack
     * @example
     * // Get one SetlistTrack
     * const setlistTrack = await prisma.setlistTrack.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SetlistTrackFindUniqueArgs>(args: SelectSubset<T, SetlistTrackFindUniqueArgs<ExtArgs>>): Prisma__SetlistTrackClient<$Result.GetResult<Prisma.$SetlistTrackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SetlistTrack that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SetlistTrackFindUniqueOrThrowArgs} args - Arguments to find a SetlistTrack
     * @example
     * // Get one SetlistTrack
     * const setlistTrack = await prisma.setlistTrack.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SetlistTrackFindUniqueOrThrowArgs>(args: SelectSubset<T, SetlistTrackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SetlistTrackClient<$Result.GetResult<Prisma.$SetlistTrackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SetlistTrack that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetlistTrackFindFirstArgs} args - Arguments to find a SetlistTrack
     * @example
     * // Get one SetlistTrack
     * const setlistTrack = await prisma.setlistTrack.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SetlistTrackFindFirstArgs>(args?: SelectSubset<T, SetlistTrackFindFirstArgs<ExtArgs>>): Prisma__SetlistTrackClient<$Result.GetResult<Prisma.$SetlistTrackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SetlistTrack that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetlistTrackFindFirstOrThrowArgs} args - Arguments to find a SetlistTrack
     * @example
     * // Get one SetlistTrack
     * const setlistTrack = await prisma.setlistTrack.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SetlistTrackFindFirstOrThrowArgs>(args?: SelectSubset<T, SetlistTrackFindFirstOrThrowArgs<ExtArgs>>): Prisma__SetlistTrackClient<$Result.GetResult<Prisma.$SetlistTrackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SetlistTracks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetlistTrackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SetlistTracks
     * const setlistTracks = await prisma.setlistTrack.findMany()
     * 
     * // Get first 10 SetlistTracks
     * const setlistTracks = await prisma.setlistTrack.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const setlistTrackWithIdOnly = await prisma.setlistTrack.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SetlistTrackFindManyArgs>(args?: SelectSubset<T, SetlistTrackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SetlistTrackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SetlistTrack.
     * @param {SetlistTrackCreateArgs} args - Arguments to create a SetlistTrack.
     * @example
     * // Create one SetlistTrack
     * const SetlistTrack = await prisma.setlistTrack.create({
     *   data: {
     *     // ... data to create a SetlistTrack
     *   }
     * })
     * 
     */
    create<T extends SetlistTrackCreateArgs>(args: SelectSubset<T, SetlistTrackCreateArgs<ExtArgs>>): Prisma__SetlistTrackClient<$Result.GetResult<Prisma.$SetlistTrackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SetlistTracks.
     * @param {SetlistTrackCreateManyArgs} args - Arguments to create many SetlistTracks.
     * @example
     * // Create many SetlistTracks
     * const setlistTrack = await prisma.setlistTrack.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SetlistTrackCreateManyArgs>(args?: SelectSubset<T, SetlistTrackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SetlistTracks and returns the data saved in the database.
     * @param {SetlistTrackCreateManyAndReturnArgs} args - Arguments to create many SetlistTracks.
     * @example
     * // Create many SetlistTracks
     * const setlistTrack = await prisma.setlistTrack.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SetlistTracks and only return the `id`
     * const setlistTrackWithIdOnly = await prisma.setlistTrack.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SetlistTrackCreateManyAndReturnArgs>(args?: SelectSubset<T, SetlistTrackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SetlistTrackPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SetlistTrack.
     * @param {SetlistTrackDeleteArgs} args - Arguments to delete one SetlistTrack.
     * @example
     * // Delete one SetlistTrack
     * const SetlistTrack = await prisma.setlistTrack.delete({
     *   where: {
     *     // ... filter to delete one SetlistTrack
     *   }
     * })
     * 
     */
    delete<T extends SetlistTrackDeleteArgs>(args: SelectSubset<T, SetlistTrackDeleteArgs<ExtArgs>>): Prisma__SetlistTrackClient<$Result.GetResult<Prisma.$SetlistTrackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SetlistTrack.
     * @param {SetlistTrackUpdateArgs} args - Arguments to update one SetlistTrack.
     * @example
     * // Update one SetlistTrack
     * const setlistTrack = await prisma.setlistTrack.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SetlistTrackUpdateArgs>(args: SelectSubset<T, SetlistTrackUpdateArgs<ExtArgs>>): Prisma__SetlistTrackClient<$Result.GetResult<Prisma.$SetlistTrackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SetlistTracks.
     * @param {SetlistTrackDeleteManyArgs} args - Arguments to filter SetlistTracks to delete.
     * @example
     * // Delete a few SetlistTracks
     * const { count } = await prisma.setlistTrack.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SetlistTrackDeleteManyArgs>(args?: SelectSubset<T, SetlistTrackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SetlistTracks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetlistTrackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SetlistTracks
     * const setlistTrack = await prisma.setlistTrack.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SetlistTrackUpdateManyArgs>(args: SelectSubset<T, SetlistTrackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SetlistTracks and returns the data updated in the database.
     * @param {SetlistTrackUpdateManyAndReturnArgs} args - Arguments to update many SetlistTracks.
     * @example
     * // Update many SetlistTracks
     * const setlistTrack = await prisma.setlistTrack.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SetlistTracks and only return the `id`
     * const setlistTrackWithIdOnly = await prisma.setlistTrack.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SetlistTrackUpdateManyAndReturnArgs>(args: SelectSubset<T, SetlistTrackUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SetlistTrackPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SetlistTrack.
     * @param {SetlistTrackUpsertArgs} args - Arguments to update or create a SetlistTrack.
     * @example
     * // Update or create a SetlistTrack
     * const setlistTrack = await prisma.setlistTrack.upsert({
     *   create: {
     *     // ... data to create a SetlistTrack
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SetlistTrack we want to update
     *   }
     * })
     */
    upsert<T extends SetlistTrackUpsertArgs>(args: SelectSubset<T, SetlistTrackUpsertArgs<ExtArgs>>): Prisma__SetlistTrackClient<$Result.GetResult<Prisma.$SetlistTrackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SetlistTracks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetlistTrackCountArgs} args - Arguments to filter SetlistTracks to count.
     * @example
     * // Count the number of SetlistTracks
     * const count = await prisma.setlistTrack.count({
     *   where: {
     *     // ... the filter for the SetlistTracks we want to count
     *   }
     * })
    **/
    count<T extends SetlistTrackCountArgs>(
      args?: Subset<T, SetlistTrackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SetlistTrackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SetlistTrack.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetlistTrackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SetlistTrackAggregateArgs>(args: Subset<T, SetlistTrackAggregateArgs>): Prisma.PrismaPromise<GetSetlistTrackAggregateType<T>>

    /**
     * Group by SetlistTrack.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SetlistTrackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SetlistTrackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SetlistTrackGroupByArgs['orderBy'] }
        : { orderBy?: SetlistTrackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SetlistTrackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSetlistTrackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SetlistTrack model
   */
  readonly fields: SetlistTrackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SetlistTrack.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SetlistTrackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    setlist<T extends SetlistDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SetlistDefaultArgs<ExtArgs>>): Prisma__SetlistClient<$Result.GetResult<Prisma.$SetlistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SetlistTrack model
   */
  interface SetlistTrackFieldRefs {
    readonly id: FieldRef<"SetlistTrack", 'Int'>
    readonly setlistId: FieldRef<"SetlistTrack", 'String'>
    readonly orderNumber: FieldRef<"SetlistTrack", 'Int'>
    readonly title: FieldRef<"SetlistTrack", 'String'>
    readonly spotifyTrackId: FieldRef<"SetlistTrack", 'String'>
    readonly duration: FieldRef<"SetlistTrack", 'Int'>
    readonly createdAt: FieldRef<"SetlistTrack", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SetlistTrack findUnique
   */
  export type SetlistTrackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SetlistTrack
     */
    select?: SetlistTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SetlistTrack
     */
    omit?: SetlistTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistTrackInclude<ExtArgs> | null
    /**
     * Filter, which SetlistTrack to fetch.
     */
    where: SetlistTrackWhereUniqueInput
  }

  /**
   * SetlistTrack findUniqueOrThrow
   */
  export type SetlistTrackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SetlistTrack
     */
    select?: SetlistTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SetlistTrack
     */
    omit?: SetlistTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistTrackInclude<ExtArgs> | null
    /**
     * Filter, which SetlistTrack to fetch.
     */
    where: SetlistTrackWhereUniqueInput
  }

  /**
   * SetlistTrack findFirst
   */
  export type SetlistTrackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SetlistTrack
     */
    select?: SetlistTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SetlistTrack
     */
    omit?: SetlistTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistTrackInclude<ExtArgs> | null
    /**
     * Filter, which SetlistTrack to fetch.
     */
    where?: SetlistTrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SetlistTracks to fetch.
     */
    orderBy?: SetlistTrackOrderByWithRelationInput | SetlistTrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SetlistTracks.
     */
    cursor?: SetlistTrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SetlistTracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SetlistTracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SetlistTracks.
     */
    distinct?: SetlistTrackScalarFieldEnum | SetlistTrackScalarFieldEnum[]
  }

  /**
   * SetlistTrack findFirstOrThrow
   */
  export type SetlistTrackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SetlistTrack
     */
    select?: SetlistTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SetlistTrack
     */
    omit?: SetlistTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistTrackInclude<ExtArgs> | null
    /**
     * Filter, which SetlistTrack to fetch.
     */
    where?: SetlistTrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SetlistTracks to fetch.
     */
    orderBy?: SetlistTrackOrderByWithRelationInput | SetlistTrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SetlistTracks.
     */
    cursor?: SetlistTrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SetlistTracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SetlistTracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SetlistTracks.
     */
    distinct?: SetlistTrackScalarFieldEnum | SetlistTrackScalarFieldEnum[]
  }

  /**
   * SetlistTrack findMany
   */
  export type SetlistTrackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SetlistTrack
     */
    select?: SetlistTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SetlistTrack
     */
    omit?: SetlistTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistTrackInclude<ExtArgs> | null
    /**
     * Filter, which SetlistTracks to fetch.
     */
    where?: SetlistTrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SetlistTracks to fetch.
     */
    orderBy?: SetlistTrackOrderByWithRelationInput | SetlistTrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SetlistTracks.
     */
    cursor?: SetlistTrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SetlistTracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SetlistTracks.
     */
    skip?: number
    distinct?: SetlistTrackScalarFieldEnum | SetlistTrackScalarFieldEnum[]
  }

  /**
   * SetlistTrack create
   */
  export type SetlistTrackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SetlistTrack
     */
    select?: SetlistTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SetlistTrack
     */
    omit?: SetlistTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistTrackInclude<ExtArgs> | null
    /**
     * The data needed to create a SetlistTrack.
     */
    data: XOR<SetlistTrackCreateInput, SetlistTrackUncheckedCreateInput>
  }

  /**
   * SetlistTrack createMany
   */
  export type SetlistTrackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SetlistTracks.
     */
    data: SetlistTrackCreateManyInput | SetlistTrackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SetlistTrack createManyAndReturn
   */
  export type SetlistTrackCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SetlistTrack
     */
    select?: SetlistTrackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SetlistTrack
     */
    omit?: SetlistTrackOmit<ExtArgs> | null
    /**
     * The data used to create many SetlistTracks.
     */
    data: SetlistTrackCreateManyInput | SetlistTrackCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistTrackIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SetlistTrack update
   */
  export type SetlistTrackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SetlistTrack
     */
    select?: SetlistTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SetlistTrack
     */
    omit?: SetlistTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistTrackInclude<ExtArgs> | null
    /**
     * The data needed to update a SetlistTrack.
     */
    data: XOR<SetlistTrackUpdateInput, SetlistTrackUncheckedUpdateInput>
    /**
     * Choose, which SetlistTrack to update.
     */
    where: SetlistTrackWhereUniqueInput
  }

  /**
   * SetlistTrack updateMany
   */
  export type SetlistTrackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SetlistTracks.
     */
    data: XOR<SetlistTrackUpdateManyMutationInput, SetlistTrackUncheckedUpdateManyInput>
    /**
     * Filter which SetlistTracks to update
     */
    where?: SetlistTrackWhereInput
    /**
     * Limit how many SetlistTracks to update.
     */
    limit?: number
  }

  /**
   * SetlistTrack updateManyAndReturn
   */
  export type SetlistTrackUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SetlistTrack
     */
    select?: SetlistTrackSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SetlistTrack
     */
    omit?: SetlistTrackOmit<ExtArgs> | null
    /**
     * The data used to update SetlistTracks.
     */
    data: XOR<SetlistTrackUpdateManyMutationInput, SetlistTrackUncheckedUpdateManyInput>
    /**
     * Filter which SetlistTracks to update
     */
    where?: SetlistTrackWhereInput
    /**
     * Limit how many SetlistTracks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistTrackIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SetlistTrack upsert
   */
  export type SetlistTrackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SetlistTrack
     */
    select?: SetlistTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SetlistTrack
     */
    omit?: SetlistTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistTrackInclude<ExtArgs> | null
    /**
     * The filter to search for the SetlistTrack to update in case it exists.
     */
    where: SetlistTrackWhereUniqueInput
    /**
     * In case the SetlistTrack found by the `where` argument doesn't exist, create a new SetlistTrack with this data.
     */
    create: XOR<SetlistTrackCreateInput, SetlistTrackUncheckedCreateInput>
    /**
     * In case the SetlistTrack was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SetlistTrackUpdateInput, SetlistTrackUncheckedUpdateInput>
  }

  /**
   * SetlistTrack delete
   */
  export type SetlistTrackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SetlistTrack
     */
    select?: SetlistTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SetlistTrack
     */
    omit?: SetlistTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistTrackInclude<ExtArgs> | null
    /**
     * Filter which SetlistTrack to delete.
     */
    where: SetlistTrackWhereUniqueInput
  }

  /**
   * SetlistTrack deleteMany
   */
  export type SetlistTrackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SetlistTracks to delete
     */
    where?: SetlistTrackWhereInput
    /**
     * Limit how many SetlistTracks to delete.
     */
    limit?: number
  }

  /**
   * SetlistTrack without action
   */
  export type SetlistTrackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SetlistTrack
     */
    select?: SetlistTrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SetlistTrack
     */
    omit?: SetlistTrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SetlistTrackInclude<ExtArgs> | null
  }


  /**
   * Model NotificationSettings
   */

  export type AggregateNotificationSettings = {
    _count: NotificationSettingsCountAggregateOutputType | null
    _avg: NotificationSettingsAvgAggregateOutputType | null
    _sum: NotificationSettingsSumAggregateOutputType | null
    _min: NotificationSettingsMinAggregateOutputType | null
    _max: NotificationSettingsMaxAggregateOutputType | null
  }

  export type NotificationSettingsAvgAggregateOutputType = {
    id: number | null
  }

  export type NotificationSettingsSumAggregateOutputType = {
    id: number | null
  }

  export type NotificationSettingsMinAggregateOutputType = {
    id: number | null
    userId: string | null
    ticketOpenAlert: boolean | null
    concertRegistrationAlert: boolean | null
    emailNotification: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationSettingsMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    ticketOpenAlert: boolean | null
    concertRegistrationAlert: boolean | null
    emailNotification: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationSettingsCountAggregateOutputType = {
    id: number
    userId: number
    ticketOpenAlert: number
    concertRegistrationAlert: number
    emailNotification: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NotificationSettingsAvgAggregateInputType = {
    id?: true
  }

  export type NotificationSettingsSumAggregateInputType = {
    id?: true
  }

  export type NotificationSettingsMinAggregateInputType = {
    id?: true
    userId?: true
    ticketOpenAlert?: true
    concertRegistrationAlert?: true
    emailNotification?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationSettingsMaxAggregateInputType = {
    id?: true
    userId?: true
    ticketOpenAlert?: true
    concertRegistrationAlert?: true
    emailNotification?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationSettingsCountAggregateInputType = {
    id?: true
    userId?: true
    ticketOpenAlert?: true
    concertRegistrationAlert?: true
    emailNotification?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NotificationSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationSettings to aggregate.
     */
    where?: NotificationSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationSettings to fetch.
     */
    orderBy?: NotificationSettingsOrderByWithRelationInput | NotificationSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NotificationSettings
    **/
    _count?: true | NotificationSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationSettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationSettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationSettingsMaxAggregateInputType
  }

  export type GetNotificationSettingsAggregateType<T extends NotificationSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateNotificationSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotificationSettings[P]>
      : GetScalarType<T[P], AggregateNotificationSettings[P]>
  }




  export type NotificationSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationSettingsWhereInput
    orderBy?: NotificationSettingsOrderByWithAggregationInput | NotificationSettingsOrderByWithAggregationInput[]
    by: NotificationSettingsScalarFieldEnum[] | NotificationSettingsScalarFieldEnum
    having?: NotificationSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationSettingsCountAggregateInputType | true
    _avg?: NotificationSettingsAvgAggregateInputType
    _sum?: NotificationSettingsSumAggregateInputType
    _min?: NotificationSettingsMinAggregateInputType
    _max?: NotificationSettingsMaxAggregateInputType
  }

  export type NotificationSettingsGroupByOutputType = {
    id: number
    userId: string
    ticketOpenAlert: boolean
    concertRegistrationAlert: boolean
    emailNotification: boolean
    createdAt: Date
    updatedAt: Date
    _count: NotificationSettingsCountAggregateOutputType | null
    _avg: NotificationSettingsAvgAggregateOutputType | null
    _sum: NotificationSettingsSumAggregateOutputType | null
    _min: NotificationSettingsMinAggregateOutputType | null
    _max: NotificationSettingsMaxAggregateOutputType | null
  }

  type GetNotificationSettingsGroupByPayload<T extends NotificationSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationSettingsGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    ticketOpenAlert?: boolean
    concertRegistrationAlert?: boolean
    emailNotification?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notificationSettings"]>

  export type NotificationSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    ticketOpenAlert?: boolean
    concertRegistrationAlert?: boolean
    emailNotification?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notificationSettings"]>

  export type NotificationSettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    ticketOpenAlert?: boolean
    concertRegistrationAlert?: boolean
    emailNotification?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notificationSettings"]>

  export type NotificationSettingsSelectScalar = {
    id?: boolean
    userId?: boolean
    ticketOpenAlert?: boolean
    concertRegistrationAlert?: boolean
    emailNotification?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NotificationSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "ticketOpenAlert" | "concertRegistrationAlert" | "emailNotification" | "createdAt" | "updatedAt", ExtArgs["result"]["notificationSettings"]>
  export type NotificationSettingsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationSettingsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationSettingsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NotificationSettings"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      ticketOpenAlert: boolean
      concertRegistrationAlert: boolean
      emailNotification: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["notificationSettings"]>
    composites: {}
  }

  type NotificationSettingsGetPayload<S extends boolean | null | undefined | NotificationSettingsDefaultArgs> = $Result.GetResult<Prisma.$NotificationSettingsPayload, S>

  type NotificationSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationSettingsCountAggregateInputType | true
    }

  export interface NotificationSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NotificationSettings'], meta: { name: 'NotificationSettings' } }
    /**
     * Find zero or one NotificationSettings that matches the filter.
     * @param {NotificationSettingsFindUniqueArgs} args - Arguments to find a NotificationSettings
     * @example
     * // Get one NotificationSettings
     * const notificationSettings = await prisma.notificationSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationSettingsFindUniqueArgs>(args: SelectSubset<T, NotificationSettingsFindUniqueArgs<ExtArgs>>): Prisma__NotificationSettingsClient<$Result.GetResult<Prisma.$NotificationSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NotificationSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationSettingsFindUniqueOrThrowArgs} args - Arguments to find a NotificationSettings
     * @example
     * // Get one NotificationSettings
     * const notificationSettings = await prisma.notificationSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationSettingsClient<$Result.GetResult<Prisma.$NotificationSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationSettingsFindFirstArgs} args - Arguments to find a NotificationSettings
     * @example
     * // Get one NotificationSettings
     * const notificationSettings = await prisma.notificationSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationSettingsFindFirstArgs>(args?: SelectSubset<T, NotificationSettingsFindFirstArgs<ExtArgs>>): Prisma__NotificationSettingsClient<$Result.GetResult<Prisma.$NotificationSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationSettingsFindFirstOrThrowArgs} args - Arguments to find a NotificationSettings
     * @example
     * // Get one NotificationSettings
     * const notificationSettings = await prisma.notificationSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationSettingsClient<$Result.GetResult<Prisma.$NotificationSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NotificationSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NotificationSettings
     * const notificationSettings = await prisma.notificationSettings.findMany()
     * 
     * // Get first 10 NotificationSettings
     * const notificationSettings = await prisma.notificationSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationSettingsWithIdOnly = await prisma.notificationSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationSettingsFindManyArgs>(args?: SelectSubset<T, NotificationSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NotificationSettings.
     * @param {NotificationSettingsCreateArgs} args - Arguments to create a NotificationSettings.
     * @example
     * // Create one NotificationSettings
     * const NotificationSettings = await prisma.notificationSettings.create({
     *   data: {
     *     // ... data to create a NotificationSettings
     *   }
     * })
     * 
     */
    create<T extends NotificationSettingsCreateArgs>(args: SelectSubset<T, NotificationSettingsCreateArgs<ExtArgs>>): Prisma__NotificationSettingsClient<$Result.GetResult<Prisma.$NotificationSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NotificationSettings.
     * @param {NotificationSettingsCreateManyArgs} args - Arguments to create many NotificationSettings.
     * @example
     * // Create many NotificationSettings
     * const notificationSettings = await prisma.notificationSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationSettingsCreateManyArgs>(args?: SelectSubset<T, NotificationSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NotificationSettings and returns the data saved in the database.
     * @param {NotificationSettingsCreateManyAndReturnArgs} args - Arguments to create many NotificationSettings.
     * @example
     * // Create many NotificationSettings
     * const notificationSettings = await prisma.notificationSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NotificationSettings and only return the `id`
     * const notificationSettingsWithIdOnly = await prisma.notificationSettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NotificationSettings.
     * @param {NotificationSettingsDeleteArgs} args - Arguments to delete one NotificationSettings.
     * @example
     * // Delete one NotificationSettings
     * const NotificationSettings = await prisma.notificationSettings.delete({
     *   where: {
     *     // ... filter to delete one NotificationSettings
     *   }
     * })
     * 
     */
    delete<T extends NotificationSettingsDeleteArgs>(args: SelectSubset<T, NotificationSettingsDeleteArgs<ExtArgs>>): Prisma__NotificationSettingsClient<$Result.GetResult<Prisma.$NotificationSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NotificationSettings.
     * @param {NotificationSettingsUpdateArgs} args - Arguments to update one NotificationSettings.
     * @example
     * // Update one NotificationSettings
     * const notificationSettings = await prisma.notificationSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationSettingsUpdateArgs>(args: SelectSubset<T, NotificationSettingsUpdateArgs<ExtArgs>>): Prisma__NotificationSettingsClient<$Result.GetResult<Prisma.$NotificationSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NotificationSettings.
     * @param {NotificationSettingsDeleteManyArgs} args - Arguments to filter NotificationSettings to delete.
     * @example
     * // Delete a few NotificationSettings
     * const { count } = await prisma.notificationSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationSettingsDeleteManyArgs>(args?: SelectSubset<T, NotificationSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NotificationSettings
     * const notificationSettings = await prisma.notificationSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationSettingsUpdateManyArgs>(args: SelectSubset<T, NotificationSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationSettings and returns the data updated in the database.
     * @param {NotificationSettingsUpdateManyAndReturnArgs} args - Arguments to update many NotificationSettings.
     * @example
     * // Update many NotificationSettings
     * const notificationSettings = await prisma.notificationSettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NotificationSettings and only return the `id`
     * const notificationSettingsWithIdOnly = await prisma.notificationSettings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationSettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NotificationSettings.
     * @param {NotificationSettingsUpsertArgs} args - Arguments to update or create a NotificationSettings.
     * @example
     * // Update or create a NotificationSettings
     * const notificationSettings = await prisma.notificationSettings.upsert({
     *   create: {
     *     // ... data to create a NotificationSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NotificationSettings we want to update
     *   }
     * })
     */
    upsert<T extends NotificationSettingsUpsertArgs>(args: SelectSubset<T, NotificationSettingsUpsertArgs<ExtArgs>>): Prisma__NotificationSettingsClient<$Result.GetResult<Prisma.$NotificationSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NotificationSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationSettingsCountArgs} args - Arguments to filter NotificationSettings to count.
     * @example
     * // Count the number of NotificationSettings
     * const count = await prisma.notificationSettings.count({
     *   where: {
     *     // ... the filter for the NotificationSettings we want to count
     *   }
     * })
    **/
    count<T extends NotificationSettingsCountArgs>(
      args?: Subset<T, NotificationSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NotificationSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationSettingsAggregateArgs>(args: Subset<T, NotificationSettingsAggregateArgs>): Prisma.PrismaPromise<GetNotificationSettingsAggregateType<T>>

    /**
     * Group by NotificationSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationSettingsGroupByArgs['orderBy'] }
        : { orderBy?: NotificationSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NotificationSettings model
   */
  readonly fields: NotificationSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NotificationSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NotificationSettings model
   */
  interface NotificationSettingsFieldRefs {
    readonly id: FieldRef<"NotificationSettings", 'Int'>
    readonly userId: FieldRef<"NotificationSettings", 'String'>
    readonly ticketOpenAlert: FieldRef<"NotificationSettings", 'Boolean'>
    readonly concertRegistrationAlert: FieldRef<"NotificationSettings", 'Boolean'>
    readonly emailNotification: FieldRef<"NotificationSettings", 'Boolean'>
    readonly createdAt: FieldRef<"NotificationSettings", 'DateTime'>
    readonly updatedAt: FieldRef<"NotificationSettings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NotificationSettings findUnique
   */
  export type NotificationSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationSettings
     */
    select?: NotificationSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationSettings
     */
    omit?: NotificationSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationSettingsInclude<ExtArgs> | null
    /**
     * Filter, which NotificationSettings to fetch.
     */
    where: NotificationSettingsWhereUniqueInput
  }

  /**
   * NotificationSettings findUniqueOrThrow
   */
  export type NotificationSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationSettings
     */
    select?: NotificationSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationSettings
     */
    omit?: NotificationSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationSettingsInclude<ExtArgs> | null
    /**
     * Filter, which NotificationSettings to fetch.
     */
    where: NotificationSettingsWhereUniqueInput
  }

  /**
   * NotificationSettings findFirst
   */
  export type NotificationSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationSettings
     */
    select?: NotificationSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationSettings
     */
    omit?: NotificationSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationSettingsInclude<ExtArgs> | null
    /**
     * Filter, which NotificationSettings to fetch.
     */
    where?: NotificationSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationSettings to fetch.
     */
    orderBy?: NotificationSettingsOrderByWithRelationInput | NotificationSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationSettings.
     */
    cursor?: NotificationSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationSettings.
     */
    distinct?: NotificationSettingsScalarFieldEnum | NotificationSettingsScalarFieldEnum[]
  }

  /**
   * NotificationSettings findFirstOrThrow
   */
  export type NotificationSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationSettings
     */
    select?: NotificationSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationSettings
     */
    omit?: NotificationSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationSettingsInclude<ExtArgs> | null
    /**
     * Filter, which NotificationSettings to fetch.
     */
    where?: NotificationSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationSettings to fetch.
     */
    orderBy?: NotificationSettingsOrderByWithRelationInput | NotificationSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationSettings.
     */
    cursor?: NotificationSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationSettings.
     */
    distinct?: NotificationSettingsScalarFieldEnum | NotificationSettingsScalarFieldEnum[]
  }

  /**
   * NotificationSettings findMany
   */
  export type NotificationSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationSettings
     */
    select?: NotificationSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationSettings
     */
    omit?: NotificationSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationSettingsInclude<ExtArgs> | null
    /**
     * Filter, which NotificationSettings to fetch.
     */
    where?: NotificationSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationSettings to fetch.
     */
    orderBy?: NotificationSettingsOrderByWithRelationInput | NotificationSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NotificationSettings.
     */
    cursor?: NotificationSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationSettings.
     */
    skip?: number
    distinct?: NotificationSettingsScalarFieldEnum | NotificationSettingsScalarFieldEnum[]
  }

  /**
   * NotificationSettings create
   */
  export type NotificationSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationSettings
     */
    select?: NotificationSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationSettings
     */
    omit?: NotificationSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationSettingsInclude<ExtArgs> | null
    /**
     * The data needed to create a NotificationSettings.
     */
    data: XOR<NotificationSettingsCreateInput, NotificationSettingsUncheckedCreateInput>
  }

  /**
   * NotificationSettings createMany
   */
  export type NotificationSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NotificationSettings.
     */
    data: NotificationSettingsCreateManyInput | NotificationSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationSettings createManyAndReturn
   */
  export type NotificationSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationSettings
     */
    select?: NotificationSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationSettings
     */
    omit?: NotificationSettingsOmit<ExtArgs> | null
    /**
     * The data used to create many NotificationSettings.
     */
    data: NotificationSettingsCreateManyInput | NotificationSettingsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationSettingsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NotificationSettings update
   */
  export type NotificationSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationSettings
     */
    select?: NotificationSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationSettings
     */
    omit?: NotificationSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationSettingsInclude<ExtArgs> | null
    /**
     * The data needed to update a NotificationSettings.
     */
    data: XOR<NotificationSettingsUpdateInput, NotificationSettingsUncheckedUpdateInput>
    /**
     * Choose, which NotificationSettings to update.
     */
    where: NotificationSettingsWhereUniqueInput
  }

  /**
   * NotificationSettings updateMany
   */
  export type NotificationSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NotificationSettings.
     */
    data: XOR<NotificationSettingsUpdateManyMutationInput, NotificationSettingsUncheckedUpdateManyInput>
    /**
     * Filter which NotificationSettings to update
     */
    where?: NotificationSettingsWhereInput
    /**
     * Limit how many NotificationSettings to update.
     */
    limit?: number
  }

  /**
   * NotificationSettings updateManyAndReturn
   */
  export type NotificationSettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationSettings
     */
    select?: NotificationSettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationSettings
     */
    omit?: NotificationSettingsOmit<ExtArgs> | null
    /**
     * The data used to update NotificationSettings.
     */
    data: XOR<NotificationSettingsUpdateManyMutationInput, NotificationSettingsUncheckedUpdateManyInput>
    /**
     * Filter which NotificationSettings to update
     */
    where?: NotificationSettingsWhereInput
    /**
     * Limit how many NotificationSettings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationSettingsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * NotificationSettings upsert
   */
  export type NotificationSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationSettings
     */
    select?: NotificationSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationSettings
     */
    omit?: NotificationSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationSettingsInclude<ExtArgs> | null
    /**
     * The filter to search for the NotificationSettings to update in case it exists.
     */
    where: NotificationSettingsWhereUniqueInput
    /**
     * In case the NotificationSettings found by the `where` argument doesn't exist, create a new NotificationSettings with this data.
     */
    create: XOR<NotificationSettingsCreateInput, NotificationSettingsUncheckedCreateInput>
    /**
     * In case the NotificationSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationSettingsUpdateInput, NotificationSettingsUncheckedUpdateInput>
  }

  /**
   * NotificationSettings delete
   */
  export type NotificationSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationSettings
     */
    select?: NotificationSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationSettings
     */
    omit?: NotificationSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationSettingsInclude<ExtArgs> | null
    /**
     * Filter which NotificationSettings to delete.
     */
    where: NotificationSettingsWhereUniqueInput
  }

  /**
   * NotificationSettings deleteMany
   */
  export type NotificationSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationSettings to delete
     */
    where?: NotificationSettingsWhereInput
    /**
     * Limit how many NotificationSettings to delete.
     */
    limit?: number
  }

  /**
   * NotificationSettings without action
   */
  export type NotificationSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationSettings
     */
    select?: NotificationSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationSettings
     */
    omit?: NotificationSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationSettingsInclude<ExtArgs> | null
  }


  /**
   * Model UserDevice
   */

  export type AggregateUserDevice = {
    _count: UserDeviceCountAggregateOutputType | null
    _avg: UserDeviceAvgAggregateOutputType | null
    _sum: UserDeviceSumAggregateOutputType | null
    _min: UserDeviceMinAggregateOutputType | null
    _max: UserDeviceMaxAggregateOutputType | null
  }

  export type UserDeviceAvgAggregateOutputType = {
    id: number | null
  }

  export type UserDeviceSumAggregateOutputType = {
    id: number | null
  }

  export type UserDeviceMinAggregateOutputType = {
    id: number | null
    userId: string | null
    fcmToken: string | null
    platform: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserDeviceMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    fcmToken: string | null
    platform: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserDeviceCountAggregateOutputType = {
    id: number
    userId: number
    fcmToken: number
    platform: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserDeviceAvgAggregateInputType = {
    id?: true
  }

  export type UserDeviceSumAggregateInputType = {
    id?: true
  }

  export type UserDeviceMinAggregateInputType = {
    id?: true
    userId?: true
    fcmToken?: true
    platform?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserDeviceMaxAggregateInputType = {
    id?: true
    userId?: true
    fcmToken?: true
    platform?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserDeviceCountAggregateInputType = {
    id?: true
    userId?: true
    fcmToken?: true
    platform?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserDeviceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserDevice to aggregate.
     */
    where?: UserDeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDevices to fetch.
     */
    orderBy?: UserDeviceOrderByWithRelationInput | UserDeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserDeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDevices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDevices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserDevices
    **/
    _count?: true | UserDeviceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserDeviceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserDeviceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserDeviceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserDeviceMaxAggregateInputType
  }

  export type GetUserDeviceAggregateType<T extends UserDeviceAggregateArgs> = {
        [P in keyof T & keyof AggregateUserDevice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserDevice[P]>
      : GetScalarType<T[P], AggregateUserDevice[P]>
  }




  export type UserDeviceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserDeviceWhereInput
    orderBy?: UserDeviceOrderByWithAggregationInput | UserDeviceOrderByWithAggregationInput[]
    by: UserDeviceScalarFieldEnum[] | UserDeviceScalarFieldEnum
    having?: UserDeviceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserDeviceCountAggregateInputType | true
    _avg?: UserDeviceAvgAggregateInputType
    _sum?: UserDeviceSumAggregateInputType
    _min?: UserDeviceMinAggregateInputType
    _max?: UserDeviceMaxAggregateInputType
  }

  export type UserDeviceGroupByOutputType = {
    id: number
    userId: string
    fcmToken: string
    platform: string
    createdAt: Date
    updatedAt: Date
    _count: UserDeviceCountAggregateOutputType | null
    _avg: UserDeviceAvgAggregateOutputType | null
    _sum: UserDeviceSumAggregateOutputType | null
    _min: UserDeviceMinAggregateOutputType | null
    _max: UserDeviceMaxAggregateOutputType | null
  }

  type GetUserDeviceGroupByPayload<T extends UserDeviceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserDeviceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserDeviceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserDeviceGroupByOutputType[P]>
            : GetScalarType<T[P], UserDeviceGroupByOutputType[P]>
        }
      >
    >


  export type UserDeviceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fcmToken?: boolean
    platform?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userDevice"]>

  export type UserDeviceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fcmToken?: boolean
    platform?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userDevice"]>

  export type UserDeviceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fcmToken?: boolean
    platform?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userDevice"]>

  export type UserDeviceSelectScalar = {
    id?: boolean
    userId?: boolean
    fcmToken?: boolean
    platform?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserDeviceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "fcmToken" | "platform" | "createdAt" | "updatedAt", ExtArgs["result"]["userDevice"]>
  export type UserDeviceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserDeviceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserDeviceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserDevicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserDevice"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      fcmToken: string
      platform: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userDevice"]>
    composites: {}
  }

  type UserDeviceGetPayload<S extends boolean | null | undefined | UserDeviceDefaultArgs> = $Result.GetResult<Prisma.$UserDevicePayload, S>

  type UserDeviceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserDeviceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserDeviceCountAggregateInputType | true
    }

  export interface UserDeviceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserDevice'], meta: { name: 'UserDevice' } }
    /**
     * Find zero or one UserDevice that matches the filter.
     * @param {UserDeviceFindUniqueArgs} args - Arguments to find a UserDevice
     * @example
     * // Get one UserDevice
     * const userDevice = await prisma.userDevice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserDeviceFindUniqueArgs>(args: SelectSubset<T, UserDeviceFindUniqueArgs<ExtArgs>>): Prisma__UserDeviceClient<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserDevice that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserDeviceFindUniqueOrThrowArgs} args - Arguments to find a UserDevice
     * @example
     * // Get one UserDevice
     * const userDevice = await prisma.userDevice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserDeviceFindUniqueOrThrowArgs>(args: SelectSubset<T, UserDeviceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserDeviceClient<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserDevice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDeviceFindFirstArgs} args - Arguments to find a UserDevice
     * @example
     * // Get one UserDevice
     * const userDevice = await prisma.userDevice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserDeviceFindFirstArgs>(args?: SelectSubset<T, UserDeviceFindFirstArgs<ExtArgs>>): Prisma__UserDeviceClient<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserDevice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDeviceFindFirstOrThrowArgs} args - Arguments to find a UserDevice
     * @example
     * // Get one UserDevice
     * const userDevice = await prisma.userDevice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserDeviceFindFirstOrThrowArgs>(args?: SelectSubset<T, UserDeviceFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserDeviceClient<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserDevices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDeviceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserDevices
     * const userDevices = await prisma.userDevice.findMany()
     * 
     * // Get first 10 UserDevices
     * const userDevices = await prisma.userDevice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userDeviceWithIdOnly = await prisma.userDevice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserDeviceFindManyArgs>(args?: SelectSubset<T, UserDeviceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserDevice.
     * @param {UserDeviceCreateArgs} args - Arguments to create a UserDevice.
     * @example
     * // Create one UserDevice
     * const UserDevice = await prisma.userDevice.create({
     *   data: {
     *     // ... data to create a UserDevice
     *   }
     * })
     * 
     */
    create<T extends UserDeviceCreateArgs>(args: SelectSubset<T, UserDeviceCreateArgs<ExtArgs>>): Prisma__UserDeviceClient<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserDevices.
     * @param {UserDeviceCreateManyArgs} args - Arguments to create many UserDevices.
     * @example
     * // Create many UserDevices
     * const userDevice = await prisma.userDevice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserDeviceCreateManyArgs>(args?: SelectSubset<T, UserDeviceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserDevices and returns the data saved in the database.
     * @param {UserDeviceCreateManyAndReturnArgs} args - Arguments to create many UserDevices.
     * @example
     * // Create many UserDevices
     * const userDevice = await prisma.userDevice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserDevices and only return the `id`
     * const userDeviceWithIdOnly = await prisma.userDevice.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserDeviceCreateManyAndReturnArgs>(args?: SelectSubset<T, UserDeviceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserDevice.
     * @param {UserDeviceDeleteArgs} args - Arguments to delete one UserDevice.
     * @example
     * // Delete one UserDevice
     * const UserDevice = await prisma.userDevice.delete({
     *   where: {
     *     // ... filter to delete one UserDevice
     *   }
     * })
     * 
     */
    delete<T extends UserDeviceDeleteArgs>(args: SelectSubset<T, UserDeviceDeleteArgs<ExtArgs>>): Prisma__UserDeviceClient<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserDevice.
     * @param {UserDeviceUpdateArgs} args - Arguments to update one UserDevice.
     * @example
     * // Update one UserDevice
     * const userDevice = await prisma.userDevice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserDeviceUpdateArgs>(args: SelectSubset<T, UserDeviceUpdateArgs<ExtArgs>>): Prisma__UserDeviceClient<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserDevices.
     * @param {UserDeviceDeleteManyArgs} args - Arguments to filter UserDevices to delete.
     * @example
     * // Delete a few UserDevices
     * const { count } = await prisma.userDevice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeviceDeleteManyArgs>(args?: SelectSubset<T, UserDeviceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserDevices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDeviceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserDevices
     * const userDevice = await prisma.userDevice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserDeviceUpdateManyArgs>(args: SelectSubset<T, UserDeviceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserDevices and returns the data updated in the database.
     * @param {UserDeviceUpdateManyAndReturnArgs} args - Arguments to update many UserDevices.
     * @example
     * // Update many UserDevices
     * const userDevice = await prisma.userDevice.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserDevices and only return the `id`
     * const userDeviceWithIdOnly = await prisma.userDevice.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserDeviceUpdateManyAndReturnArgs>(args: SelectSubset<T, UserDeviceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserDevice.
     * @param {UserDeviceUpsertArgs} args - Arguments to update or create a UserDevice.
     * @example
     * // Update or create a UserDevice
     * const userDevice = await prisma.userDevice.upsert({
     *   create: {
     *     // ... data to create a UserDevice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserDevice we want to update
     *   }
     * })
     */
    upsert<T extends UserDeviceUpsertArgs>(args: SelectSubset<T, UserDeviceUpsertArgs<ExtArgs>>): Prisma__UserDeviceClient<$Result.GetResult<Prisma.$UserDevicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserDevices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDeviceCountArgs} args - Arguments to filter UserDevices to count.
     * @example
     * // Count the number of UserDevices
     * const count = await prisma.userDevice.count({
     *   where: {
     *     // ... the filter for the UserDevices we want to count
     *   }
     * })
    **/
    count<T extends UserDeviceCountArgs>(
      args?: Subset<T, UserDeviceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserDeviceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserDevice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDeviceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserDeviceAggregateArgs>(args: Subset<T, UserDeviceAggregateArgs>): Prisma.PrismaPromise<GetUserDeviceAggregateType<T>>

    /**
     * Group by UserDevice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDeviceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserDeviceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserDeviceGroupByArgs['orderBy'] }
        : { orderBy?: UserDeviceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserDeviceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserDeviceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserDevice model
   */
  readonly fields: UserDeviceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserDevice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserDeviceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserDevice model
   */
  interface UserDeviceFieldRefs {
    readonly id: FieldRef<"UserDevice", 'Int'>
    readonly userId: FieldRef<"UserDevice", 'String'>
    readonly fcmToken: FieldRef<"UserDevice", 'String'>
    readonly platform: FieldRef<"UserDevice", 'String'>
    readonly createdAt: FieldRef<"UserDevice", 'DateTime'>
    readonly updatedAt: FieldRef<"UserDevice", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserDevice findUnique
   */
  export type UserDeviceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDevice
     */
    select?: UserDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDevice
     */
    omit?: UserDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDeviceInclude<ExtArgs> | null
    /**
     * Filter, which UserDevice to fetch.
     */
    where: UserDeviceWhereUniqueInput
  }

  /**
   * UserDevice findUniqueOrThrow
   */
  export type UserDeviceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDevice
     */
    select?: UserDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDevice
     */
    omit?: UserDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDeviceInclude<ExtArgs> | null
    /**
     * Filter, which UserDevice to fetch.
     */
    where: UserDeviceWhereUniqueInput
  }

  /**
   * UserDevice findFirst
   */
  export type UserDeviceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDevice
     */
    select?: UserDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDevice
     */
    omit?: UserDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDeviceInclude<ExtArgs> | null
    /**
     * Filter, which UserDevice to fetch.
     */
    where?: UserDeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDevices to fetch.
     */
    orderBy?: UserDeviceOrderByWithRelationInput | UserDeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserDevices.
     */
    cursor?: UserDeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDevices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDevices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserDevices.
     */
    distinct?: UserDeviceScalarFieldEnum | UserDeviceScalarFieldEnum[]
  }

  /**
   * UserDevice findFirstOrThrow
   */
  export type UserDeviceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDevice
     */
    select?: UserDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDevice
     */
    omit?: UserDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDeviceInclude<ExtArgs> | null
    /**
     * Filter, which UserDevice to fetch.
     */
    where?: UserDeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDevices to fetch.
     */
    orderBy?: UserDeviceOrderByWithRelationInput | UserDeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserDevices.
     */
    cursor?: UserDeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDevices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDevices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserDevices.
     */
    distinct?: UserDeviceScalarFieldEnum | UserDeviceScalarFieldEnum[]
  }

  /**
   * UserDevice findMany
   */
  export type UserDeviceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDevice
     */
    select?: UserDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDevice
     */
    omit?: UserDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDeviceInclude<ExtArgs> | null
    /**
     * Filter, which UserDevices to fetch.
     */
    where?: UserDeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDevices to fetch.
     */
    orderBy?: UserDeviceOrderByWithRelationInput | UserDeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserDevices.
     */
    cursor?: UserDeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDevices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDevices.
     */
    skip?: number
    distinct?: UserDeviceScalarFieldEnum | UserDeviceScalarFieldEnum[]
  }

  /**
   * UserDevice create
   */
  export type UserDeviceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDevice
     */
    select?: UserDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDevice
     */
    omit?: UserDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDeviceInclude<ExtArgs> | null
    /**
     * The data needed to create a UserDevice.
     */
    data: XOR<UserDeviceCreateInput, UserDeviceUncheckedCreateInput>
  }

  /**
   * UserDevice createMany
   */
  export type UserDeviceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserDevices.
     */
    data: UserDeviceCreateManyInput | UserDeviceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserDevice createManyAndReturn
   */
  export type UserDeviceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDevice
     */
    select?: UserDeviceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserDevice
     */
    omit?: UserDeviceOmit<ExtArgs> | null
    /**
     * The data used to create many UserDevices.
     */
    data: UserDeviceCreateManyInput | UserDeviceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDeviceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserDevice update
   */
  export type UserDeviceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDevice
     */
    select?: UserDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDevice
     */
    omit?: UserDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDeviceInclude<ExtArgs> | null
    /**
     * The data needed to update a UserDevice.
     */
    data: XOR<UserDeviceUpdateInput, UserDeviceUncheckedUpdateInput>
    /**
     * Choose, which UserDevice to update.
     */
    where: UserDeviceWhereUniqueInput
  }

  /**
   * UserDevice updateMany
   */
  export type UserDeviceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserDevices.
     */
    data: XOR<UserDeviceUpdateManyMutationInput, UserDeviceUncheckedUpdateManyInput>
    /**
     * Filter which UserDevices to update
     */
    where?: UserDeviceWhereInput
    /**
     * Limit how many UserDevices to update.
     */
    limit?: number
  }

  /**
   * UserDevice updateManyAndReturn
   */
  export type UserDeviceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDevice
     */
    select?: UserDeviceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserDevice
     */
    omit?: UserDeviceOmit<ExtArgs> | null
    /**
     * The data used to update UserDevices.
     */
    data: XOR<UserDeviceUpdateManyMutationInput, UserDeviceUncheckedUpdateManyInput>
    /**
     * Filter which UserDevices to update
     */
    where?: UserDeviceWhereInput
    /**
     * Limit how many UserDevices to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDeviceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserDevice upsert
   */
  export type UserDeviceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDevice
     */
    select?: UserDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDevice
     */
    omit?: UserDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDeviceInclude<ExtArgs> | null
    /**
     * The filter to search for the UserDevice to update in case it exists.
     */
    where: UserDeviceWhereUniqueInput
    /**
     * In case the UserDevice found by the `where` argument doesn't exist, create a new UserDevice with this data.
     */
    create: XOR<UserDeviceCreateInput, UserDeviceUncheckedCreateInput>
    /**
     * In case the UserDevice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserDeviceUpdateInput, UserDeviceUncheckedUpdateInput>
  }

  /**
   * UserDevice delete
   */
  export type UserDeviceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDevice
     */
    select?: UserDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDevice
     */
    omit?: UserDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDeviceInclude<ExtArgs> | null
    /**
     * Filter which UserDevice to delete.
     */
    where: UserDeviceWhereUniqueInput
  }

  /**
   * UserDevice deleteMany
   */
  export type UserDeviceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserDevices to delete
     */
    where?: UserDeviceWhereInput
    /**
     * Limit how many UserDevices to delete.
     */
    limit?: number
  }

  /**
   * UserDevice without action
   */
  export type UserDeviceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDevice
     */
    select?: UserDeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDevice
     */
    omit?: UserDeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDeviceInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationAvgAggregateOutputType = {
    id: number | null
  }

  export type NotificationSumAggregateOutputType = {
    id: number | null
  }

  export type NotificationMinAggregateOutputType = {
    id: number | null
    userId: string | null
    type: string | null
    title: string | null
    body: string | null
    concertId: string | null
    readAt: Date | null
    sentAt: Date | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    type: string | null
    title: string | null
    body: string | null
    concertId: string | null
    readAt: Date | null
    sentAt: Date | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    title: number
    body: number
    concertId: number
    readAt: number
    sentAt: number
    createdAt: number
    _all: number
  }


  export type NotificationAvgAggregateInputType = {
    id?: true
  }

  export type NotificationSumAggregateInputType = {
    id?: true
  }

  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    body?: true
    concertId?: true
    readAt?: true
    sentAt?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    body?: true
    concertId?: true
    readAt?: true
    sentAt?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    body?: true
    concertId?: true
    readAt?: true
    sentAt?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _avg?: NotificationAvgAggregateInputType
    _sum?: NotificationSumAggregateInputType
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: number
    userId: string
    type: string
    title: string
    body: string
    concertId: string | null
    readAt: Date | null
    sentAt: Date
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    body?: boolean
    concertId?: boolean
    readAt?: boolean
    sentAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    concert?: boolean | Notification$concertArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    body?: boolean
    concertId?: boolean
    readAt?: boolean
    sentAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    concert?: boolean | Notification$concertArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    body?: boolean
    concertId?: boolean
    readAt?: boolean
    sentAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    concert?: boolean | Notification$concertArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    body?: boolean
    concertId?: boolean
    readAt?: boolean
    sentAt?: boolean
    createdAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "title" | "body" | "concertId" | "readAt" | "sentAt" | "createdAt", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    concert?: boolean | Notification$concertArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    concert?: boolean | Notification$concertArgs<ExtArgs>
  }
  export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    concert?: boolean | Notification$concertArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      concert: Prisma.$ConcertPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      type: string
      title: string
      body: string
      concertId: string | null
      readAt: Date | null
      sentAt: Date
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    concert<T extends Notification$concertArgs<ExtArgs> = {}>(args?: Subset<T, Notification$concertArgs<ExtArgs>>): Prisma__ConcertClient<$Result.GetResult<Prisma.$ConcertPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'Int'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly body: FieldRef<"Notification", 'String'>
    readonly concertId: FieldRef<"Notification", 'String'>
    readonly readAt: FieldRef<"Notification", 'DateTime'>
    readonly sentAt: FieldRef<"Notification", 'DateTime'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification.concert
   */
  export type Notification$concertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Concert
     */
    select?: ConcertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Concert
     */
    omit?: ConcertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConcertInclude<ExtArgs> | null
    where?: ConcertWhereInput
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires',
    createdAt: 'createdAt'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const ArtistScalarFieldEnum: {
    id: 'id',
    name: 'name',
    image: 'image',
    genre: 'genre',
    description: 'description',
    spotifyArtistId: 'spotifyArtistId',
    followerCount: 'followerCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ArtistScalarFieldEnum = (typeof ArtistScalarFieldEnum)[keyof typeof ArtistScalarFieldEnum]


  export const ConcertScalarFieldEnum: {
    id: 'id',
    kopisId: 'kopisId',
    title: 'title',
    artistId: 'artistId',
    poster: 'poster',
    date: 'date',
    venueName: 'venueName',
    venueAddress: 'venueAddress',
    venueMapLink: 'venueMapLink',
    region: 'region',
    genre: 'genre',
    description: 'description',
    ticketStatus: 'ticketStatus',
    ticketOpenDate: 'ticketOpenDate',
    ticketPriceMin: 'ticketPriceMin',
    ticketPriceMax: 'ticketPriceMax',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ConcertScalarFieldEnum = (typeof ConcertScalarFieldEnum)[keyof typeof ConcertScalarFieldEnum]


  export const BookingLinkScalarFieldEnum: {
    id: 'id',
    concertId: 'concertId',
    platform: 'platform',
    url: 'url',
    createdAt: 'createdAt'
  };

  export type BookingLinkScalarFieldEnum = (typeof BookingLinkScalarFieldEnum)[keyof typeof BookingLinkScalarFieldEnum]


  export const UserArtistScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    artistId: 'artistId',
    createdAt: 'createdAt'
  };

  export type UserArtistScalarFieldEnum = (typeof UserArtistScalarFieldEnum)[keyof typeof UserArtistScalarFieldEnum]


  export const SetlistScalarFieldEnum: {
    id: 'id',
    concertId: 'concertId',
    artistId: 'artistId',
    date: 'date',
    venue: 'venue',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SetlistScalarFieldEnum = (typeof SetlistScalarFieldEnum)[keyof typeof SetlistScalarFieldEnum]


  export const SetlistTrackScalarFieldEnum: {
    id: 'id',
    setlistId: 'setlistId',
    orderNumber: 'orderNumber',
    title: 'title',
    spotifyTrackId: 'spotifyTrackId',
    duration: 'duration',
    createdAt: 'createdAt'
  };

  export type SetlistTrackScalarFieldEnum = (typeof SetlistTrackScalarFieldEnum)[keyof typeof SetlistTrackScalarFieldEnum]


  export const NotificationSettingsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    ticketOpenAlert: 'ticketOpenAlert',
    concertRegistrationAlert: 'concertRegistrationAlert',
    emailNotification: 'emailNotification',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NotificationSettingsScalarFieldEnum = (typeof NotificationSettingsScalarFieldEnum)[keyof typeof NotificationSettingsScalarFieldEnum]


  export const UserDeviceScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    fcmToken: 'fcmToken',
    platform: 'platform',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserDeviceScalarFieldEnum = (typeof UserDeviceScalarFieldEnum)[keyof typeof UserDeviceScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    title: 'title',
    body: 'body',
    concertId: 'concertId',
    readAt: 'readAt',
    sentAt: 'sentAt',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    followedArtists?: UserArtistListRelationFilter
    notificationSettings?: XOR<NotificationSettingsNullableScalarRelationFilter, NotificationSettingsWhereInput> | null
    devices?: UserDeviceListRelationFilter
    notifications?: NotificationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    followedArtists?: UserArtistOrderByRelationAggregateInput
    notificationSettings?: NotificationSettingsOrderByWithRelationInput
    devices?: UserDeviceOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    followedArtists?: UserArtistListRelationFilter
    notificationSettings?: XOR<NotificationSettingsNullableScalarRelationFilter, NotificationSettingsWhereInput> | null
    devices?: UserDeviceListRelationFilter
    notifications?: NotificationListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
    createdAt?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
    createdAt?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "token" | "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type ArtistWhereInput = {
    AND?: ArtistWhereInput | ArtistWhereInput[]
    OR?: ArtistWhereInput[]
    NOT?: ArtistWhereInput | ArtistWhereInput[]
    id?: StringFilter<"Artist"> | string
    name?: StringFilter<"Artist"> | string
    image?: StringNullableFilter<"Artist"> | string | null
    genre?: StringNullableFilter<"Artist"> | string | null
    description?: StringNullableFilter<"Artist"> | string | null
    spotifyArtistId?: StringNullableFilter<"Artist"> | string | null
    followerCount?: IntFilter<"Artist"> | number
    createdAt?: DateTimeFilter<"Artist"> | Date | string
    updatedAt?: DateTimeFilter<"Artist"> | Date | string
    concerts?: ConcertListRelationFilter
    followers?: UserArtistListRelationFilter
    setlists?: SetlistListRelationFilter
  }

  export type ArtistOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrderInput | SortOrder
    genre?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    spotifyArtistId?: SortOrderInput | SortOrder
    followerCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    concerts?: ConcertOrderByRelationAggregateInput
    followers?: UserArtistOrderByRelationAggregateInput
    setlists?: SetlistOrderByRelationAggregateInput
  }

  export type ArtistWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    spotifyArtistId?: string
    AND?: ArtistWhereInput | ArtistWhereInput[]
    OR?: ArtistWhereInput[]
    NOT?: ArtistWhereInput | ArtistWhereInput[]
    name?: StringFilter<"Artist"> | string
    image?: StringNullableFilter<"Artist"> | string | null
    genre?: StringNullableFilter<"Artist"> | string | null
    description?: StringNullableFilter<"Artist"> | string | null
    followerCount?: IntFilter<"Artist"> | number
    createdAt?: DateTimeFilter<"Artist"> | Date | string
    updatedAt?: DateTimeFilter<"Artist"> | Date | string
    concerts?: ConcertListRelationFilter
    followers?: UserArtistListRelationFilter
    setlists?: SetlistListRelationFilter
  }, "id" | "spotifyArtistId">

  export type ArtistOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrderInput | SortOrder
    genre?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    spotifyArtistId?: SortOrderInput | SortOrder
    followerCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ArtistCountOrderByAggregateInput
    _avg?: ArtistAvgOrderByAggregateInput
    _max?: ArtistMaxOrderByAggregateInput
    _min?: ArtistMinOrderByAggregateInput
    _sum?: ArtistSumOrderByAggregateInput
  }

  export type ArtistScalarWhereWithAggregatesInput = {
    AND?: ArtistScalarWhereWithAggregatesInput | ArtistScalarWhereWithAggregatesInput[]
    OR?: ArtistScalarWhereWithAggregatesInput[]
    NOT?: ArtistScalarWhereWithAggregatesInput | ArtistScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Artist"> | string
    name?: StringWithAggregatesFilter<"Artist"> | string
    image?: StringNullableWithAggregatesFilter<"Artist"> | string | null
    genre?: StringNullableWithAggregatesFilter<"Artist"> | string | null
    description?: StringNullableWithAggregatesFilter<"Artist"> | string | null
    spotifyArtistId?: StringNullableWithAggregatesFilter<"Artist"> | string | null
    followerCount?: IntWithAggregatesFilter<"Artist"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Artist"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Artist"> | Date | string
  }

  export type ConcertWhereInput = {
    AND?: ConcertWhereInput | ConcertWhereInput[]
    OR?: ConcertWhereInput[]
    NOT?: ConcertWhereInput | ConcertWhereInput[]
    id?: StringFilter<"Concert"> | string
    kopisId?: StringNullableFilter<"Concert"> | string | null
    title?: StringFilter<"Concert"> | string
    artistId?: StringNullableFilter<"Concert"> | string | null
    poster?: StringNullableFilter<"Concert"> | string | null
    date?: DateTimeFilter<"Concert"> | Date | string
    venueName?: StringFilter<"Concert"> | string
    venueAddress?: StringNullableFilter<"Concert"> | string | null
    venueMapLink?: StringNullableFilter<"Concert"> | string | null
    region?: StringNullableFilter<"Concert"> | string | null
    genre?: StringNullableFilter<"Concert"> | string | null
    description?: StringNullableFilter<"Concert"> | string | null
    ticketStatus?: StringNullableFilter<"Concert"> | string | null
    ticketOpenDate?: DateTimeNullableFilter<"Concert"> | Date | string | null
    ticketPriceMin?: IntNullableFilter<"Concert"> | number | null
    ticketPriceMax?: IntNullableFilter<"Concert"> | number | null
    createdAt?: DateTimeFilter<"Concert"> | Date | string
    updatedAt?: DateTimeFilter<"Concert"> | Date | string
    artist?: XOR<ArtistNullableScalarRelationFilter, ArtistWhereInput> | null
    bookingLinks?: BookingLinkListRelationFilter
    setlists?: SetlistListRelationFilter
    notifications?: NotificationListRelationFilter
  }

  export type ConcertOrderByWithRelationInput = {
    id?: SortOrder
    kopisId?: SortOrderInput | SortOrder
    title?: SortOrder
    artistId?: SortOrderInput | SortOrder
    poster?: SortOrderInput | SortOrder
    date?: SortOrder
    venueName?: SortOrder
    venueAddress?: SortOrderInput | SortOrder
    venueMapLink?: SortOrderInput | SortOrder
    region?: SortOrderInput | SortOrder
    genre?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    ticketStatus?: SortOrderInput | SortOrder
    ticketOpenDate?: SortOrderInput | SortOrder
    ticketPriceMin?: SortOrderInput | SortOrder
    ticketPriceMax?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    artist?: ArtistOrderByWithRelationInput
    bookingLinks?: BookingLinkOrderByRelationAggregateInput
    setlists?: SetlistOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
  }

  export type ConcertWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    kopisId?: string
    AND?: ConcertWhereInput | ConcertWhereInput[]
    OR?: ConcertWhereInput[]
    NOT?: ConcertWhereInput | ConcertWhereInput[]
    title?: StringFilter<"Concert"> | string
    artistId?: StringNullableFilter<"Concert"> | string | null
    poster?: StringNullableFilter<"Concert"> | string | null
    date?: DateTimeFilter<"Concert"> | Date | string
    venueName?: StringFilter<"Concert"> | string
    venueAddress?: StringNullableFilter<"Concert"> | string | null
    venueMapLink?: StringNullableFilter<"Concert"> | string | null
    region?: StringNullableFilter<"Concert"> | string | null
    genre?: StringNullableFilter<"Concert"> | string | null
    description?: StringNullableFilter<"Concert"> | string | null
    ticketStatus?: StringNullableFilter<"Concert"> | string | null
    ticketOpenDate?: DateTimeNullableFilter<"Concert"> | Date | string | null
    ticketPriceMin?: IntNullableFilter<"Concert"> | number | null
    ticketPriceMax?: IntNullableFilter<"Concert"> | number | null
    createdAt?: DateTimeFilter<"Concert"> | Date | string
    updatedAt?: DateTimeFilter<"Concert"> | Date | string
    artist?: XOR<ArtistNullableScalarRelationFilter, ArtistWhereInput> | null
    bookingLinks?: BookingLinkListRelationFilter
    setlists?: SetlistListRelationFilter
    notifications?: NotificationListRelationFilter
  }, "id" | "kopisId">

  export type ConcertOrderByWithAggregationInput = {
    id?: SortOrder
    kopisId?: SortOrderInput | SortOrder
    title?: SortOrder
    artistId?: SortOrderInput | SortOrder
    poster?: SortOrderInput | SortOrder
    date?: SortOrder
    venueName?: SortOrder
    venueAddress?: SortOrderInput | SortOrder
    venueMapLink?: SortOrderInput | SortOrder
    region?: SortOrderInput | SortOrder
    genre?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    ticketStatus?: SortOrderInput | SortOrder
    ticketOpenDate?: SortOrderInput | SortOrder
    ticketPriceMin?: SortOrderInput | SortOrder
    ticketPriceMax?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ConcertCountOrderByAggregateInput
    _avg?: ConcertAvgOrderByAggregateInput
    _max?: ConcertMaxOrderByAggregateInput
    _min?: ConcertMinOrderByAggregateInput
    _sum?: ConcertSumOrderByAggregateInput
  }

  export type ConcertScalarWhereWithAggregatesInput = {
    AND?: ConcertScalarWhereWithAggregatesInput | ConcertScalarWhereWithAggregatesInput[]
    OR?: ConcertScalarWhereWithAggregatesInput[]
    NOT?: ConcertScalarWhereWithAggregatesInput | ConcertScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Concert"> | string
    kopisId?: StringNullableWithAggregatesFilter<"Concert"> | string | null
    title?: StringWithAggregatesFilter<"Concert"> | string
    artistId?: StringNullableWithAggregatesFilter<"Concert"> | string | null
    poster?: StringNullableWithAggregatesFilter<"Concert"> | string | null
    date?: DateTimeWithAggregatesFilter<"Concert"> | Date | string
    venueName?: StringWithAggregatesFilter<"Concert"> | string
    venueAddress?: StringNullableWithAggregatesFilter<"Concert"> | string | null
    venueMapLink?: StringNullableWithAggregatesFilter<"Concert"> | string | null
    region?: StringNullableWithAggregatesFilter<"Concert"> | string | null
    genre?: StringNullableWithAggregatesFilter<"Concert"> | string | null
    description?: StringNullableWithAggregatesFilter<"Concert"> | string | null
    ticketStatus?: StringNullableWithAggregatesFilter<"Concert"> | string | null
    ticketOpenDate?: DateTimeNullableWithAggregatesFilter<"Concert"> | Date | string | null
    ticketPriceMin?: IntNullableWithAggregatesFilter<"Concert"> | number | null
    ticketPriceMax?: IntNullableWithAggregatesFilter<"Concert"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Concert"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Concert"> | Date | string
  }

  export type BookingLinkWhereInput = {
    AND?: BookingLinkWhereInput | BookingLinkWhereInput[]
    OR?: BookingLinkWhereInput[]
    NOT?: BookingLinkWhereInput | BookingLinkWhereInput[]
    id?: IntFilter<"BookingLink"> | number
    concertId?: StringFilter<"BookingLink"> | string
    platform?: StringFilter<"BookingLink"> | string
    url?: StringFilter<"BookingLink"> | string
    createdAt?: DateTimeFilter<"BookingLink"> | Date | string
    concert?: XOR<ConcertScalarRelationFilter, ConcertWhereInput>
  }

  export type BookingLinkOrderByWithRelationInput = {
    id?: SortOrder
    concertId?: SortOrder
    platform?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    concert?: ConcertOrderByWithRelationInput
  }

  export type BookingLinkWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BookingLinkWhereInput | BookingLinkWhereInput[]
    OR?: BookingLinkWhereInput[]
    NOT?: BookingLinkWhereInput | BookingLinkWhereInput[]
    concertId?: StringFilter<"BookingLink"> | string
    platform?: StringFilter<"BookingLink"> | string
    url?: StringFilter<"BookingLink"> | string
    createdAt?: DateTimeFilter<"BookingLink"> | Date | string
    concert?: XOR<ConcertScalarRelationFilter, ConcertWhereInput>
  }, "id">

  export type BookingLinkOrderByWithAggregationInput = {
    id?: SortOrder
    concertId?: SortOrder
    platform?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    _count?: BookingLinkCountOrderByAggregateInput
    _avg?: BookingLinkAvgOrderByAggregateInput
    _max?: BookingLinkMaxOrderByAggregateInput
    _min?: BookingLinkMinOrderByAggregateInput
    _sum?: BookingLinkSumOrderByAggregateInput
  }

  export type BookingLinkScalarWhereWithAggregatesInput = {
    AND?: BookingLinkScalarWhereWithAggregatesInput | BookingLinkScalarWhereWithAggregatesInput[]
    OR?: BookingLinkScalarWhereWithAggregatesInput[]
    NOT?: BookingLinkScalarWhereWithAggregatesInput | BookingLinkScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BookingLink"> | number
    concertId?: StringWithAggregatesFilter<"BookingLink"> | string
    platform?: StringWithAggregatesFilter<"BookingLink"> | string
    url?: StringWithAggregatesFilter<"BookingLink"> | string
    createdAt?: DateTimeWithAggregatesFilter<"BookingLink"> | Date | string
  }

  export type UserArtistWhereInput = {
    AND?: UserArtistWhereInput | UserArtistWhereInput[]
    OR?: UserArtistWhereInput[]
    NOT?: UserArtistWhereInput | UserArtistWhereInput[]
    id?: IntFilter<"UserArtist"> | number
    userId?: StringFilter<"UserArtist"> | string
    artistId?: StringFilter<"UserArtist"> | string
    createdAt?: DateTimeFilter<"UserArtist"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    artist?: XOR<ArtistScalarRelationFilter, ArtistWhereInput>
  }

  export type UserArtistOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    artistId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    artist?: ArtistOrderByWithRelationInput
  }

  export type UserArtistWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_artistId?: UserArtistUserIdArtistIdCompoundUniqueInput
    AND?: UserArtistWhereInput | UserArtistWhereInput[]
    OR?: UserArtistWhereInput[]
    NOT?: UserArtistWhereInput | UserArtistWhereInput[]
    userId?: StringFilter<"UserArtist"> | string
    artistId?: StringFilter<"UserArtist"> | string
    createdAt?: DateTimeFilter<"UserArtist"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    artist?: XOR<ArtistScalarRelationFilter, ArtistWhereInput>
  }, "id" | "userId_artistId">

  export type UserArtistOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    artistId?: SortOrder
    createdAt?: SortOrder
    _count?: UserArtistCountOrderByAggregateInput
    _avg?: UserArtistAvgOrderByAggregateInput
    _max?: UserArtistMaxOrderByAggregateInput
    _min?: UserArtistMinOrderByAggregateInput
    _sum?: UserArtistSumOrderByAggregateInput
  }

  export type UserArtistScalarWhereWithAggregatesInput = {
    AND?: UserArtistScalarWhereWithAggregatesInput | UserArtistScalarWhereWithAggregatesInput[]
    OR?: UserArtistScalarWhereWithAggregatesInput[]
    NOT?: UserArtistScalarWhereWithAggregatesInput | UserArtistScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserArtist"> | number
    userId?: StringWithAggregatesFilter<"UserArtist"> | string
    artistId?: StringWithAggregatesFilter<"UserArtist"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UserArtist"> | Date | string
  }

  export type SetlistWhereInput = {
    AND?: SetlistWhereInput | SetlistWhereInput[]
    OR?: SetlistWhereInput[]
    NOT?: SetlistWhereInput | SetlistWhereInput[]
    id?: StringFilter<"Setlist"> | string
    concertId?: StringNullableFilter<"Setlist"> | string | null
    artistId?: StringNullableFilter<"Setlist"> | string | null
    date?: DateTimeNullableFilter<"Setlist"> | Date | string | null
    venue?: StringNullableFilter<"Setlist"> | string | null
    createdAt?: DateTimeFilter<"Setlist"> | Date | string
    updatedAt?: DateTimeFilter<"Setlist"> | Date | string
    concert?: XOR<ConcertNullableScalarRelationFilter, ConcertWhereInput> | null
    artist?: XOR<ArtistNullableScalarRelationFilter, ArtistWhereInput> | null
    tracks?: SetlistTrackListRelationFilter
  }

  export type SetlistOrderByWithRelationInput = {
    id?: SortOrder
    concertId?: SortOrderInput | SortOrder
    artistId?: SortOrderInput | SortOrder
    date?: SortOrderInput | SortOrder
    venue?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    concert?: ConcertOrderByWithRelationInput
    artist?: ArtistOrderByWithRelationInput
    tracks?: SetlistTrackOrderByRelationAggregateInput
  }

  export type SetlistWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SetlistWhereInput | SetlistWhereInput[]
    OR?: SetlistWhereInput[]
    NOT?: SetlistWhereInput | SetlistWhereInput[]
    concertId?: StringNullableFilter<"Setlist"> | string | null
    artistId?: StringNullableFilter<"Setlist"> | string | null
    date?: DateTimeNullableFilter<"Setlist"> | Date | string | null
    venue?: StringNullableFilter<"Setlist"> | string | null
    createdAt?: DateTimeFilter<"Setlist"> | Date | string
    updatedAt?: DateTimeFilter<"Setlist"> | Date | string
    concert?: XOR<ConcertNullableScalarRelationFilter, ConcertWhereInput> | null
    artist?: XOR<ArtistNullableScalarRelationFilter, ArtistWhereInput> | null
    tracks?: SetlistTrackListRelationFilter
  }, "id">

  export type SetlistOrderByWithAggregationInput = {
    id?: SortOrder
    concertId?: SortOrderInput | SortOrder
    artistId?: SortOrderInput | SortOrder
    date?: SortOrderInput | SortOrder
    venue?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SetlistCountOrderByAggregateInput
    _max?: SetlistMaxOrderByAggregateInput
    _min?: SetlistMinOrderByAggregateInput
  }

  export type SetlistScalarWhereWithAggregatesInput = {
    AND?: SetlistScalarWhereWithAggregatesInput | SetlistScalarWhereWithAggregatesInput[]
    OR?: SetlistScalarWhereWithAggregatesInput[]
    NOT?: SetlistScalarWhereWithAggregatesInput | SetlistScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Setlist"> | string
    concertId?: StringNullableWithAggregatesFilter<"Setlist"> | string | null
    artistId?: StringNullableWithAggregatesFilter<"Setlist"> | string | null
    date?: DateTimeNullableWithAggregatesFilter<"Setlist"> | Date | string | null
    venue?: StringNullableWithAggregatesFilter<"Setlist"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Setlist"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Setlist"> | Date | string
  }

  export type SetlistTrackWhereInput = {
    AND?: SetlistTrackWhereInput | SetlistTrackWhereInput[]
    OR?: SetlistTrackWhereInput[]
    NOT?: SetlistTrackWhereInput | SetlistTrackWhereInput[]
    id?: IntFilter<"SetlistTrack"> | number
    setlistId?: StringFilter<"SetlistTrack"> | string
    orderNumber?: IntFilter<"SetlistTrack"> | number
    title?: StringFilter<"SetlistTrack"> | string
    spotifyTrackId?: StringNullableFilter<"SetlistTrack"> | string | null
    duration?: IntNullableFilter<"SetlistTrack"> | number | null
    createdAt?: DateTimeFilter<"SetlistTrack"> | Date | string
    setlist?: XOR<SetlistScalarRelationFilter, SetlistWhereInput>
  }

  export type SetlistTrackOrderByWithRelationInput = {
    id?: SortOrder
    setlistId?: SortOrder
    orderNumber?: SortOrder
    title?: SortOrder
    spotifyTrackId?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    setlist?: SetlistOrderByWithRelationInput
  }

  export type SetlistTrackWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SetlistTrackWhereInput | SetlistTrackWhereInput[]
    OR?: SetlistTrackWhereInput[]
    NOT?: SetlistTrackWhereInput | SetlistTrackWhereInput[]
    setlistId?: StringFilter<"SetlistTrack"> | string
    orderNumber?: IntFilter<"SetlistTrack"> | number
    title?: StringFilter<"SetlistTrack"> | string
    spotifyTrackId?: StringNullableFilter<"SetlistTrack"> | string | null
    duration?: IntNullableFilter<"SetlistTrack"> | number | null
    createdAt?: DateTimeFilter<"SetlistTrack"> | Date | string
    setlist?: XOR<SetlistScalarRelationFilter, SetlistWhereInput>
  }, "id">

  export type SetlistTrackOrderByWithAggregationInput = {
    id?: SortOrder
    setlistId?: SortOrder
    orderNumber?: SortOrder
    title?: SortOrder
    spotifyTrackId?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SetlistTrackCountOrderByAggregateInput
    _avg?: SetlistTrackAvgOrderByAggregateInput
    _max?: SetlistTrackMaxOrderByAggregateInput
    _min?: SetlistTrackMinOrderByAggregateInput
    _sum?: SetlistTrackSumOrderByAggregateInput
  }

  export type SetlistTrackScalarWhereWithAggregatesInput = {
    AND?: SetlistTrackScalarWhereWithAggregatesInput | SetlistTrackScalarWhereWithAggregatesInput[]
    OR?: SetlistTrackScalarWhereWithAggregatesInput[]
    NOT?: SetlistTrackScalarWhereWithAggregatesInput | SetlistTrackScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SetlistTrack"> | number
    setlistId?: StringWithAggregatesFilter<"SetlistTrack"> | string
    orderNumber?: IntWithAggregatesFilter<"SetlistTrack"> | number
    title?: StringWithAggregatesFilter<"SetlistTrack"> | string
    spotifyTrackId?: StringNullableWithAggregatesFilter<"SetlistTrack"> | string | null
    duration?: IntNullableWithAggregatesFilter<"SetlistTrack"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"SetlistTrack"> | Date | string
  }

  export type NotificationSettingsWhereInput = {
    AND?: NotificationSettingsWhereInput | NotificationSettingsWhereInput[]
    OR?: NotificationSettingsWhereInput[]
    NOT?: NotificationSettingsWhereInput | NotificationSettingsWhereInput[]
    id?: IntFilter<"NotificationSettings"> | number
    userId?: StringFilter<"NotificationSettings"> | string
    ticketOpenAlert?: BoolFilter<"NotificationSettings"> | boolean
    concertRegistrationAlert?: BoolFilter<"NotificationSettings"> | boolean
    emailNotification?: BoolFilter<"NotificationSettings"> | boolean
    createdAt?: DateTimeFilter<"NotificationSettings"> | Date | string
    updatedAt?: DateTimeFilter<"NotificationSettings"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type NotificationSettingsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    ticketOpenAlert?: SortOrder
    concertRegistrationAlert?: SortOrder
    emailNotification?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: string
    AND?: NotificationSettingsWhereInput | NotificationSettingsWhereInput[]
    OR?: NotificationSettingsWhereInput[]
    NOT?: NotificationSettingsWhereInput | NotificationSettingsWhereInput[]
    ticketOpenAlert?: BoolFilter<"NotificationSettings"> | boolean
    concertRegistrationAlert?: BoolFilter<"NotificationSettings"> | boolean
    emailNotification?: BoolFilter<"NotificationSettings"> | boolean
    createdAt?: DateTimeFilter<"NotificationSettings"> | Date | string
    updatedAt?: DateTimeFilter<"NotificationSettings"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type NotificationSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    ticketOpenAlert?: SortOrder
    concertRegistrationAlert?: SortOrder
    emailNotification?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NotificationSettingsCountOrderByAggregateInput
    _avg?: NotificationSettingsAvgOrderByAggregateInput
    _max?: NotificationSettingsMaxOrderByAggregateInput
    _min?: NotificationSettingsMinOrderByAggregateInput
    _sum?: NotificationSettingsSumOrderByAggregateInput
  }

  export type NotificationSettingsScalarWhereWithAggregatesInput = {
    AND?: NotificationSettingsScalarWhereWithAggregatesInput | NotificationSettingsScalarWhereWithAggregatesInput[]
    OR?: NotificationSettingsScalarWhereWithAggregatesInput[]
    NOT?: NotificationSettingsScalarWhereWithAggregatesInput | NotificationSettingsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"NotificationSettings"> | number
    userId?: StringWithAggregatesFilter<"NotificationSettings"> | string
    ticketOpenAlert?: BoolWithAggregatesFilter<"NotificationSettings"> | boolean
    concertRegistrationAlert?: BoolWithAggregatesFilter<"NotificationSettings"> | boolean
    emailNotification?: BoolWithAggregatesFilter<"NotificationSettings"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"NotificationSettings"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NotificationSettings"> | Date | string
  }

  export type UserDeviceWhereInput = {
    AND?: UserDeviceWhereInput | UserDeviceWhereInput[]
    OR?: UserDeviceWhereInput[]
    NOT?: UserDeviceWhereInput | UserDeviceWhereInput[]
    id?: IntFilter<"UserDevice"> | number
    userId?: StringFilter<"UserDevice"> | string
    fcmToken?: StringFilter<"UserDevice"> | string
    platform?: StringFilter<"UserDevice"> | string
    createdAt?: DateTimeFilter<"UserDevice"> | Date | string
    updatedAt?: DateTimeFilter<"UserDevice"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserDeviceOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    fcmToken?: SortOrder
    platform?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserDeviceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    fcmToken?: string
    AND?: UserDeviceWhereInput | UserDeviceWhereInput[]
    OR?: UserDeviceWhereInput[]
    NOT?: UserDeviceWhereInput | UserDeviceWhereInput[]
    userId?: StringFilter<"UserDevice"> | string
    platform?: StringFilter<"UserDevice"> | string
    createdAt?: DateTimeFilter<"UserDevice"> | Date | string
    updatedAt?: DateTimeFilter<"UserDevice"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "fcmToken">

  export type UserDeviceOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    fcmToken?: SortOrder
    platform?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserDeviceCountOrderByAggregateInput
    _avg?: UserDeviceAvgOrderByAggregateInput
    _max?: UserDeviceMaxOrderByAggregateInput
    _min?: UserDeviceMinOrderByAggregateInput
    _sum?: UserDeviceSumOrderByAggregateInput
  }

  export type UserDeviceScalarWhereWithAggregatesInput = {
    AND?: UserDeviceScalarWhereWithAggregatesInput | UserDeviceScalarWhereWithAggregatesInput[]
    OR?: UserDeviceScalarWhereWithAggregatesInput[]
    NOT?: UserDeviceScalarWhereWithAggregatesInput | UserDeviceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserDevice"> | number
    userId?: StringWithAggregatesFilter<"UserDevice"> | string
    fcmToken?: StringWithAggregatesFilter<"UserDevice"> | string
    platform?: StringWithAggregatesFilter<"UserDevice"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UserDevice"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserDevice"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: IntFilter<"Notification"> | number
    userId?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    body?: StringFilter<"Notification"> | string
    concertId?: StringNullableFilter<"Notification"> | string | null
    readAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
    sentAt?: DateTimeFilter<"Notification"> | Date | string
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    concert?: XOR<ConcertNullableScalarRelationFilter, ConcertWhereInput> | null
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    concertId?: SortOrderInput | SortOrder
    readAt?: SortOrderInput | SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    concert?: ConcertOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    body?: StringFilter<"Notification"> | string
    concertId?: StringNullableFilter<"Notification"> | string | null
    readAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
    sentAt?: DateTimeFilter<"Notification"> | Date | string
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    concert?: XOR<ConcertNullableScalarRelationFilter, ConcertWhereInput> | null
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    concertId?: SortOrderInput | SortOrder
    readAt?: SortOrderInput | SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _avg?: NotificationAvgOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
    _sum?: NotificationSumOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Notification"> | number
    userId?: StringWithAggregatesFilter<"Notification"> | string
    type?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    body?: StringWithAggregatesFilter<"Notification"> | string
    concertId?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    readAt?: DateTimeNullableWithAggregatesFilter<"Notification"> | Date | string | null
    sentAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    followedArtists?: UserArtistCreateNestedManyWithoutUserInput
    notificationSettings?: NotificationSettingsCreateNestedOneWithoutUserInput
    devices?: UserDeviceCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    followedArtists?: UserArtistUncheckedCreateNestedManyWithoutUserInput
    notificationSettings?: NotificationSettingsUncheckedCreateNestedOneWithoutUserInput
    devices?: UserDeviceUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    followedArtists?: UserArtistUpdateManyWithoutUserNestedInput
    notificationSettings?: NotificationSettingsUpdateOneWithoutUserNestedInput
    devices?: UserDeviceUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    followedArtists?: UserArtistUncheckedUpdateManyWithoutUserNestedInput
    notificationSettings?: NotificationSettingsUncheckedUpdateOneWithoutUserNestedInput
    devices?: UserDeviceUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
    createdAt?: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
    createdAt?: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
    createdAt?: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtistCreateInput = {
    id?: string
    name: string
    image?: string | null
    genre?: string | null
    description?: string | null
    spotifyArtistId?: string | null
    followerCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    concerts?: ConcertCreateNestedManyWithoutArtistInput
    followers?: UserArtistCreateNestedManyWithoutArtistInput
    setlists?: SetlistCreateNestedManyWithoutArtistInput
  }

  export type ArtistUncheckedCreateInput = {
    id?: string
    name: string
    image?: string | null
    genre?: string | null
    description?: string | null
    spotifyArtistId?: string | null
    followerCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    concerts?: ConcertUncheckedCreateNestedManyWithoutArtistInput
    followers?: UserArtistUncheckedCreateNestedManyWithoutArtistInput
    setlists?: SetlistUncheckedCreateNestedManyWithoutArtistInput
  }

  export type ArtistUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    spotifyArtistId?: NullableStringFieldUpdateOperationsInput | string | null
    followerCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    concerts?: ConcertUpdateManyWithoutArtistNestedInput
    followers?: UserArtistUpdateManyWithoutArtistNestedInput
    setlists?: SetlistUpdateManyWithoutArtistNestedInput
  }

  export type ArtistUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    spotifyArtistId?: NullableStringFieldUpdateOperationsInput | string | null
    followerCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    concerts?: ConcertUncheckedUpdateManyWithoutArtistNestedInput
    followers?: UserArtistUncheckedUpdateManyWithoutArtistNestedInput
    setlists?: SetlistUncheckedUpdateManyWithoutArtistNestedInput
  }

  export type ArtistCreateManyInput = {
    id?: string
    name: string
    image?: string | null
    genre?: string | null
    description?: string | null
    spotifyArtistId?: string | null
    followerCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArtistUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    spotifyArtistId?: NullableStringFieldUpdateOperationsInput | string | null
    followerCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArtistUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    spotifyArtistId?: NullableStringFieldUpdateOperationsInput | string | null
    followerCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConcertCreateInput = {
    id?: string
    kopisId?: string | null
    title: string
    poster?: string | null
    date: Date | string
    venueName: string
    venueAddress?: string | null
    venueMapLink?: string | null
    region?: string | null
    genre?: string | null
    description?: string | null
    ticketStatus?: string | null
    ticketOpenDate?: Date | string | null
    ticketPriceMin?: number | null
    ticketPriceMax?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    artist?: ArtistCreateNestedOneWithoutConcertsInput
    bookingLinks?: BookingLinkCreateNestedManyWithoutConcertInput
    setlists?: SetlistCreateNestedManyWithoutConcertInput
    notifications?: NotificationCreateNestedManyWithoutConcertInput
  }

  export type ConcertUncheckedCreateInput = {
    id?: string
    kopisId?: string | null
    title: string
    artistId?: string | null
    poster?: string | null
    date: Date | string
    venueName: string
    venueAddress?: string | null
    venueMapLink?: string | null
    region?: string | null
    genre?: string | null
    description?: string | null
    ticketStatus?: string | null
    ticketOpenDate?: Date | string | null
    ticketPriceMin?: number | null
    ticketPriceMax?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookingLinks?: BookingLinkUncheckedCreateNestedManyWithoutConcertInput
    setlists?: SetlistUncheckedCreateNestedManyWithoutConcertInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutConcertInput
  }

  export type ConcertUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kopisId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    venueName?: StringFieldUpdateOperationsInput | string
    venueAddress?: NullableStringFieldUpdateOperationsInput | string | null
    venueMapLink?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ticketStatus?: NullableStringFieldUpdateOperationsInput | string | null
    ticketOpenDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ticketPriceMin?: NullableIntFieldUpdateOperationsInput | number | null
    ticketPriceMax?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    artist?: ArtistUpdateOneWithoutConcertsNestedInput
    bookingLinks?: BookingLinkUpdateManyWithoutConcertNestedInput
    setlists?: SetlistUpdateManyWithoutConcertNestedInput
    notifications?: NotificationUpdateManyWithoutConcertNestedInput
  }

  export type ConcertUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kopisId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    artistId?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    venueName?: StringFieldUpdateOperationsInput | string
    venueAddress?: NullableStringFieldUpdateOperationsInput | string | null
    venueMapLink?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ticketStatus?: NullableStringFieldUpdateOperationsInput | string | null
    ticketOpenDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ticketPriceMin?: NullableIntFieldUpdateOperationsInput | number | null
    ticketPriceMax?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingLinks?: BookingLinkUncheckedUpdateManyWithoutConcertNestedInput
    setlists?: SetlistUncheckedUpdateManyWithoutConcertNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutConcertNestedInput
  }

  export type ConcertCreateManyInput = {
    id?: string
    kopisId?: string | null
    title: string
    artistId?: string | null
    poster?: string | null
    date: Date | string
    venueName: string
    venueAddress?: string | null
    venueMapLink?: string | null
    region?: string | null
    genre?: string | null
    description?: string | null
    ticketStatus?: string | null
    ticketOpenDate?: Date | string | null
    ticketPriceMin?: number | null
    ticketPriceMax?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConcertUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    kopisId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    venueName?: StringFieldUpdateOperationsInput | string
    venueAddress?: NullableStringFieldUpdateOperationsInput | string | null
    venueMapLink?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ticketStatus?: NullableStringFieldUpdateOperationsInput | string | null
    ticketOpenDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ticketPriceMin?: NullableIntFieldUpdateOperationsInput | number | null
    ticketPriceMax?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConcertUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    kopisId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    artistId?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    venueName?: StringFieldUpdateOperationsInput | string
    venueAddress?: NullableStringFieldUpdateOperationsInput | string | null
    venueMapLink?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ticketStatus?: NullableStringFieldUpdateOperationsInput | string | null
    ticketOpenDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ticketPriceMin?: NullableIntFieldUpdateOperationsInput | number | null
    ticketPriceMax?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingLinkCreateInput = {
    platform: string
    url: string
    createdAt?: Date | string
    concert: ConcertCreateNestedOneWithoutBookingLinksInput
  }

  export type BookingLinkUncheckedCreateInput = {
    id?: number
    concertId: string
    platform: string
    url: string
    createdAt?: Date | string
  }

  export type BookingLinkUpdateInput = {
    platform?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    concert?: ConcertUpdateOneRequiredWithoutBookingLinksNestedInput
  }

  export type BookingLinkUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    concertId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingLinkCreateManyInput = {
    id?: number
    concertId: string
    platform: string
    url: string
    createdAt?: Date | string
  }

  export type BookingLinkUpdateManyMutationInput = {
    platform?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingLinkUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    concertId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserArtistCreateInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFollowedArtistsInput
    artist: ArtistCreateNestedOneWithoutFollowersInput
  }

  export type UserArtistUncheckedCreateInput = {
    id?: number
    userId: string
    artistId: string
    createdAt?: Date | string
  }

  export type UserArtistUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFollowedArtistsNestedInput
    artist?: ArtistUpdateOneRequiredWithoutFollowersNestedInput
  }

  export type UserArtistUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    artistId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserArtistCreateManyInput = {
    id?: number
    userId: string
    artistId: string
    createdAt?: Date | string
  }

  export type UserArtistUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserArtistUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    artistId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SetlistCreateInput = {
    id?: string
    date?: Date | string | null
    venue?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    concert?: ConcertCreateNestedOneWithoutSetlistsInput
    artist?: ArtistCreateNestedOneWithoutSetlistsInput
    tracks?: SetlistTrackCreateNestedManyWithoutSetlistInput
  }

  export type SetlistUncheckedCreateInput = {
    id?: string
    concertId?: string | null
    artistId?: string | null
    date?: Date | string | null
    venue?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tracks?: SetlistTrackUncheckedCreateNestedManyWithoutSetlistInput
  }

  export type SetlistUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    venue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    concert?: ConcertUpdateOneWithoutSetlistsNestedInput
    artist?: ArtistUpdateOneWithoutSetlistsNestedInput
    tracks?: SetlistTrackUpdateManyWithoutSetlistNestedInput
  }

  export type SetlistUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    concertId?: NullableStringFieldUpdateOperationsInput | string | null
    artistId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    venue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tracks?: SetlistTrackUncheckedUpdateManyWithoutSetlistNestedInput
  }

  export type SetlistCreateManyInput = {
    id?: string
    concertId?: string | null
    artistId?: string | null
    date?: Date | string | null
    venue?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SetlistUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    venue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SetlistUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    concertId?: NullableStringFieldUpdateOperationsInput | string | null
    artistId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    venue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SetlistTrackCreateInput = {
    orderNumber: number
    title: string
    spotifyTrackId?: string | null
    duration?: number | null
    createdAt?: Date | string
    setlist: SetlistCreateNestedOneWithoutTracksInput
  }

  export type SetlistTrackUncheckedCreateInput = {
    id?: number
    setlistId: string
    orderNumber: number
    title: string
    spotifyTrackId?: string | null
    duration?: number | null
    createdAt?: Date | string
  }

  export type SetlistTrackUpdateInput = {
    orderNumber?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    spotifyTrackId?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    setlist?: SetlistUpdateOneRequiredWithoutTracksNestedInput
  }

  export type SetlistTrackUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    setlistId?: StringFieldUpdateOperationsInput | string
    orderNumber?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    spotifyTrackId?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SetlistTrackCreateManyInput = {
    id?: number
    setlistId: string
    orderNumber: number
    title: string
    spotifyTrackId?: string | null
    duration?: number | null
    createdAt?: Date | string
  }

  export type SetlistTrackUpdateManyMutationInput = {
    orderNumber?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    spotifyTrackId?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SetlistTrackUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    setlistId?: StringFieldUpdateOperationsInput | string
    orderNumber?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    spotifyTrackId?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationSettingsCreateInput = {
    ticketOpenAlert?: boolean
    concertRegistrationAlert?: boolean
    emailNotification?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationSettingsInput
  }

  export type NotificationSettingsUncheckedCreateInput = {
    id?: number
    userId: string
    ticketOpenAlert?: boolean
    concertRegistrationAlert?: boolean
    emailNotification?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationSettingsUpdateInput = {
    ticketOpenAlert?: BoolFieldUpdateOperationsInput | boolean
    concertRegistrationAlert?: BoolFieldUpdateOperationsInput | boolean
    emailNotification?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationSettingsNestedInput
  }

  export type NotificationSettingsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    ticketOpenAlert?: BoolFieldUpdateOperationsInput | boolean
    concertRegistrationAlert?: BoolFieldUpdateOperationsInput | boolean
    emailNotification?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationSettingsCreateManyInput = {
    id?: number
    userId: string
    ticketOpenAlert?: boolean
    concertRegistrationAlert?: boolean
    emailNotification?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationSettingsUpdateManyMutationInput = {
    ticketOpenAlert?: BoolFieldUpdateOperationsInput | boolean
    concertRegistrationAlert?: BoolFieldUpdateOperationsInput | boolean
    emailNotification?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationSettingsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    ticketOpenAlert?: BoolFieldUpdateOperationsInput | boolean
    concertRegistrationAlert?: BoolFieldUpdateOperationsInput | boolean
    emailNotification?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDeviceCreateInput = {
    fcmToken: string
    platform: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDevicesInput
  }

  export type UserDeviceUncheckedCreateInput = {
    id?: number
    userId: string
    fcmToken: string
    platform: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserDeviceUpdateInput = {
    fcmToken?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDevicesNestedInput
  }

  export type UserDeviceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    fcmToken?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDeviceCreateManyInput = {
    id?: number
    userId: string
    fcmToken: string
    platform: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserDeviceUpdateManyMutationInput = {
    fcmToken?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDeviceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    fcmToken?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    type: string
    title: string
    body: string
    readAt?: Date | string | null
    sentAt?: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
    concert?: ConcertCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: number
    userId: string
    type: string
    title: string
    body: string
    concertId?: string | null
    readAt?: Date | string | null
    sentAt?: Date | string
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
    concert?: ConcertUpdateOneWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    concertId?: NullableStringFieldUpdateOperationsInput | string | null
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: number
    userId: string
    type: string
    title: string
    body: string
    concertId?: string | null
    readAt?: Date | string | null
    sentAt?: Date | string
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    concertId?: NullableStringFieldUpdateOperationsInput | string | null
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type UserArtistListRelationFilter = {
    every?: UserArtistWhereInput
    some?: UserArtistWhereInput
    none?: UserArtistWhereInput
  }

  export type NotificationSettingsNullableScalarRelationFilter = {
    is?: NotificationSettingsWhereInput | null
    isNot?: NotificationSettingsWhereInput | null
  }

  export type UserDeviceListRelationFilter = {
    every?: UserDeviceWhereInput
    some?: UserDeviceWhereInput
    none?: UserDeviceWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserArtistOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserDeviceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ConcertListRelationFilter = {
    every?: ConcertWhereInput
    some?: ConcertWhereInput
    none?: ConcertWhereInput
  }

  export type SetlistListRelationFilter = {
    every?: SetlistWhereInput
    some?: SetlistWhereInput
    none?: SetlistWhereInput
  }

  export type ConcertOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SetlistOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ArtistCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrder
    genre?: SortOrder
    description?: SortOrder
    spotifyArtistId?: SortOrder
    followerCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArtistAvgOrderByAggregateInput = {
    followerCount?: SortOrder
  }

  export type ArtistMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrder
    genre?: SortOrder
    description?: SortOrder
    spotifyArtistId?: SortOrder
    followerCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArtistMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrder
    genre?: SortOrder
    description?: SortOrder
    spotifyArtistId?: SortOrder
    followerCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArtistSumOrderByAggregateInput = {
    followerCount?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ArtistNullableScalarRelationFilter = {
    is?: ArtistWhereInput | null
    isNot?: ArtistWhereInput | null
  }

  export type BookingLinkListRelationFilter = {
    every?: BookingLinkWhereInput
    some?: BookingLinkWhereInput
    none?: BookingLinkWhereInput
  }

  export type BookingLinkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConcertCountOrderByAggregateInput = {
    id?: SortOrder
    kopisId?: SortOrder
    title?: SortOrder
    artistId?: SortOrder
    poster?: SortOrder
    date?: SortOrder
    venueName?: SortOrder
    venueAddress?: SortOrder
    venueMapLink?: SortOrder
    region?: SortOrder
    genre?: SortOrder
    description?: SortOrder
    ticketStatus?: SortOrder
    ticketOpenDate?: SortOrder
    ticketPriceMin?: SortOrder
    ticketPriceMax?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConcertAvgOrderByAggregateInput = {
    ticketPriceMin?: SortOrder
    ticketPriceMax?: SortOrder
  }

  export type ConcertMaxOrderByAggregateInput = {
    id?: SortOrder
    kopisId?: SortOrder
    title?: SortOrder
    artistId?: SortOrder
    poster?: SortOrder
    date?: SortOrder
    venueName?: SortOrder
    venueAddress?: SortOrder
    venueMapLink?: SortOrder
    region?: SortOrder
    genre?: SortOrder
    description?: SortOrder
    ticketStatus?: SortOrder
    ticketOpenDate?: SortOrder
    ticketPriceMin?: SortOrder
    ticketPriceMax?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConcertMinOrderByAggregateInput = {
    id?: SortOrder
    kopisId?: SortOrder
    title?: SortOrder
    artistId?: SortOrder
    poster?: SortOrder
    date?: SortOrder
    venueName?: SortOrder
    venueAddress?: SortOrder
    venueMapLink?: SortOrder
    region?: SortOrder
    genre?: SortOrder
    description?: SortOrder
    ticketStatus?: SortOrder
    ticketOpenDate?: SortOrder
    ticketPriceMin?: SortOrder
    ticketPriceMax?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConcertSumOrderByAggregateInput = {
    ticketPriceMin?: SortOrder
    ticketPriceMax?: SortOrder
  }

  export type ConcertScalarRelationFilter = {
    is?: ConcertWhereInput
    isNot?: ConcertWhereInput
  }

  export type BookingLinkCountOrderByAggregateInput = {
    id?: SortOrder
    concertId?: SortOrder
    platform?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
  }

  export type BookingLinkAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BookingLinkMaxOrderByAggregateInput = {
    id?: SortOrder
    concertId?: SortOrder
    platform?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
  }

  export type BookingLinkMinOrderByAggregateInput = {
    id?: SortOrder
    concertId?: SortOrder
    platform?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
  }

  export type BookingLinkSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ArtistScalarRelationFilter = {
    is?: ArtistWhereInput
    isNot?: ArtistWhereInput
  }

  export type UserArtistUserIdArtistIdCompoundUniqueInput = {
    userId: string
    artistId: string
  }

  export type UserArtistCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    artistId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserArtistAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserArtistMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    artistId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserArtistMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    artistId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserArtistSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ConcertNullableScalarRelationFilter = {
    is?: ConcertWhereInput | null
    isNot?: ConcertWhereInput | null
  }

  export type SetlistTrackListRelationFilter = {
    every?: SetlistTrackWhereInput
    some?: SetlistTrackWhereInput
    none?: SetlistTrackWhereInput
  }

  export type SetlistTrackOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SetlistCountOrderByAggregateInput = {
    id?: SortOrder
    concertId?: SortOrder
    artistId?: SortOrder
    date?: SortOrder
    venue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SetlistMaxOrderByAggregateInput = {
    id?: SortOrder
    concertId?: SortOrder
    artistId?: SortOrder
    date?: SortOrder
    venue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SetlistMinOrderByAggregateInput = {
    id?: SortOrder
    concertId?: SortOrder
    artistId?: SortOrder
    date?: SortOrder
    venue?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SetlistScalarRelationFilter = {
    is?: SetlistWhereInput
    isNot?: SetlistWhereInput
  }

  export type SetlistTrackCountOrderByAggregateInput = {
    id?: SortOrder
    setlistId?: SortOrder
    orderNumber?: SortOrder
    title?: SortOrder
    spotifyTrackId?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
  }

  export type SetlistTrackAvgOrderByAggregateInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    duration?: SortOrder
  }

  export type SetlistTrackMaxOrderByAggregateInput = {
    id?: SortOrder
    setlistId?: SortOrder
    orderNumber?: SortOrder
    title?: SortOrder
    spotifyTrackId?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
  }

  export type SetlistTrackMinOrderByAggregateInput = {
    id?: SortOrder
    setlistId?: SortOrder
    orderNumber?: SortOrder
    title?: SortOrder
    spotifyTrackId?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
  }

  export type SetlistTrackSumOrderByAggregateInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    duration?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NotificationSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    ticketOpenAlert?: SortOrder
    concertRegistrationAlert?: SortOrder
    emailNotification?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationSettingsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type NotificationSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    ticketOpenAlert?: SortOrder
    concertRegistrationAlert?: SortOrder
    emailNotification?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    ticketOpenAlert?: SortOrder
    concertRegistrationAlert?: SortOrder
    emailNotification?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationSettingsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type UserDeviceCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fcmToken?: SortOrder
    platform?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserDeviceAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserDeviceMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fcmToken?: SortOrder
    platform?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserDeviceMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fcmToken?: SortOrder
    platform?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserDeviceSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    concertId?: SortOrder
    readAt?: SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    concertId?: SortOrder
    readAt?: SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    concertId?: SortOrder
    readAt?: SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type UserArtistCreateNestedManyWithoutUserInput = {
    create?: XOR<UserArtistCreateWithoutUserInput, UserArtistUncheckedCreateWithoutUserInput> | UserArtistCreateWithoutUserInput[] | UserArtistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserArtistCreateOrConnectWithoutUserInput | UserArtistCreateOrConnectWithoutUserInput[]
    createMany?: UserArtistCreateManyUserInputEnvelope
    connect?: UserArtistWhereUniqueInput | UserArtistWhereUniqueInput[]
  }

  export type NotificationSettingsCreateNestedOneWithoutUserInput = {
    create?: XOR<NotificationSettingsCreateWithoutUserInput, NotificationSettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: NotificationSettingsCreateOrConnectWithoutUserInput
    connect?: NotificationSettingsWhereUniqueInput
  }

  export type UserDeviceCreateNestedManyWithoutUserInput = {
    create?: XOR<UserDeviceCreateWithoutUserInput, UserDeviceUncheckedCreateWithoutUserInput> | UserDeviceCreateWithoutUserInput[] | UserDeviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDeviceCreateOrConnectWithoutUserInput | UserDeviceCreateOrConnectWithoutUserInput[]
    createMany?: UserDeviceCreateManyUserInputEnvelope
    connect?: UserDeviceWhereUniqueInput | UserDeviceWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type UserArtistUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserArtistCreateWithoutUserInput, UserArtistUncheckedCreateWithoutUserInput> | UserArtistCreateWithoutUserInput[] | UserArtistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserArtistCreateOrConnectWithoutUserInput | UserArtistCreateOrConnectWithoutUserInput[]
    createMany?: UserArtistCreateManyUserInputEnvelope
    connect?: UserArtistWhereUniqueInput | UserArtistWhereUniqueInput[]
  }

  export type NotificationSettingsUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<NotificationSettingsCreateWithoutUserInput, NotificationSettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: NotificationSettingsCreateOrConnectWithoutUserInput
    connect?: NotificationSettingsWhereUniqueInput
  }

  export type UserDeviceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserDeviceCreateWithoutUserInput, UserDeviceUncheckedCreateWithoutUserInput> | UserDeviceCreateWithoutUserInput[] | UserDeviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDeviceCreateOrConnectWithoutUserInput | UserDeviceCreateOrConnectWithoutUserInput[]
    createMany?: UserDeviceCreateManyUserInputEnvelope
    connect?: UserDeviceWhereUniqueInput | UserDeviceWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type UserArtistUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserArtistCreateWithoutUserInput, UserArtistUncheckedCreateWithoutUserInput> | UserArtistCreateWithoutUserInput[] | UserArtistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserArtistCreateOrConnectWithoutUserInput | UserArtistCreateOrConnectWithoutUserInput[]
    upsert?: UserArtistUpsertWithWhereUniqueWithoutUserInput | UserArtistUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserArtistCreateManyUserInputEnvelope
    set?: UserArtistWhereUniqueInput | UserArtistWhereUniqueInput[]
    disconnect?: UserArtistWhereUniqueInput | UserArtistWhereUniqueInput[]
    delete?: UserArtistWhereUniqueInput | UserArtistWhereUniqueInput[]
    connect?: UserArtistWhereUniqueInput | UserArtistWhereUniqueInput[]
    update?: UserArtistUpdateWithWhereUniqueWithoutUserInput | UserArtistUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserArtistUpdateManyWithWhereWithoutUserInput | UserArtistUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserArtistScalarWhereInput | UserArtistScalarWhereInput[]
  }

  export type NotificationSettingsUpdateOneWithoutUserNestedInput = {
    create?: XOR<NotificationSettingsCreateWithoutUserInput, NotificationSettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: NotificationSettingsCreateOrConnectWithoutUserInput
    upsert?: NotificationSettingsUpsertWithoutUserInput
    disconnect?: NotificationSettingsWhereInput | boolean
    delete?: NotificationSettingsWhereInput | boolean
    connect?: NotificationSettingsWhereUniqueInput
    update?: XOR<XOR<NotificationSettingsUpdateToOneWithWhereWithoutUserInput, NotificationSettingsUpdateWithoutUserInput>, NotificationSettingsUncheckedUpdateWithoutUserInput>
  }

  export type UserDeviceUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserDeviceCreateWithoutUserInput, UserDeviceUncheckedCreateWithoutUserInput> | UserDeviceCreateWithoutUserInput[] | UserDeviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDeviceCreateOrConnectWithoutUserInput | UserDeviceCreateOrConnectWithoutUserInput[]
    upsert?: UserDeviceUpsertWithWhereUniqueWithoutUserInput | UserDeviceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserDeviceCreateManyUserInputEnvelope
    set?: UserDeviceWhereUniqueInput | UserDeviceWhereUniqueInput[]
    disconnect?: UserDeviceWhereUniqueInput | UserDeviceWhereUniqueInput[]
    delete?: UserDeviceWhereUniqueInput | UserDeviceWhereUniqueInput[]
    connect?: UserDeviceWhereUniqueInput | UserDeviceWhereUniqueInput[]
    update?: UserDeviceUpdateWithWhereUniqueWithoutUserInput | UserDeviceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserDeviceUpdateManyWithWhereWithoutUserInput | UserDeviceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserDeviceScalarWhereInput | UserDeviceScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type UserArtistUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserArtistCreateWithoutUserInput, UserArtistUncheckedCreateWithoutUserInput> | UserArtistCreateWithoutUserInput[] | UserArtistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserArtistCreateOrConnectWithoutUserInput | UserArtistCreateOrConnectWithoutUserInput[]
    upsert?: UserArtistUpsertWithWhereUniqueWithoutUserInput | UserArtistUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserArtistCreateManyUserInputEnvelope
    set?: UserArtistWhereUniqueInput | UserArtistWhereUniqueInput[]
    disconnect?: UserArtistWhereUniqueInput | UserArtistWhereUniqueInput[]
    delete?: UserArtistWhereUniqueInput | UserArtistWhereUniqueInput[]
    connect?: UserArtistWhereUniqueInput | UserArtistWhereUniqueInput[]
    update?: UserArtistUpdateWithWhereUniqueWithoutUserInput | UserArtistUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserArtistUpdateManyWithWhereWithoutUserInput | UserArtistUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserArtistScalarWhereInput | UserArtistScalarWhereInput[]
  }

  export type NotificationSettingsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<NotificationSettingsCreateWithoutUserInput, NotificationSettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: NotificationSettingsCreateOrConnectWithoutUserInput
    upsert?: NotificationSettingsUpsertWithoutUserInput
    disconnect?: NotificationSettingsWhereInput | boolean
    delete?: NotificationSettingsWhereInput | boolean
    connect?: NotificationSettingsWhereUniqueInput
    update?: XOR<XOR<NotificationSettingsUpdateToOneWithWhereWithoutUserInput, NotificationSettingsUpdateWithoutUserInput>, NotificationSettingsUncheckedUpdateWithoutUserInput>
  }

  export type UserDeviceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserDeviceCreateWithoutUserInput, UserDeviceUncheckedCreateWithoutUserInput> | UserDeviceCreateWithoutUserInput[] | UserDeviceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDeviceCreateOrConnectWithoutUserInput | UserDeviceCreateOrConnectWithoutUserInput[]
    upsert?: UserDeviceUpsertWithWhereUniqueWithoutUserInput | UserDeviceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserDeviceCreateManyUserInputEnvelope
    set?: UserDeviceWhereUniqueInput | UserDeviceWhereUniqueInput[]
    disconnect?: UserDeviceWhereUniqueInput | UserDeviceWhereUniqueInput[]
    delete?: UserDeviceWhereUniqueInput | UserDeviceWhereUniqueInput[]
    connect?: UserDeviceWhereUniqueInput | UserDeviceWhereUniqueInput[]
    update?: UserDeviceUpdateWithWhereUniqueWithoutUserInput | UserDeviceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserDeviceUpdateManyWithWhereWithoutUserInput | UserDeviceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserDeviceScalarWhereInput | UserDeviceScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type ConcertCreateNestedManyWithoutArtistInput = {
    create?: XOR<ConcertCreateWithoutArtistInput, ConcertUncheckedCreateWithoutArtistInput> | ConcertCreateWithoutArtistInput[] | ConcertUncheckedCreateWithoutArtistInput[]
    connectOrCreate?: ConcertCreateOrConnectWithoutArtistInput | ConcertCreateOrConnectWithoutArtistInput[]
    createMany?: ConcertCreateManyArtistInputEnvelope
    connect?: ConcertWhereUniqueInput | ConcertWhereUniqueInput[]
  }

  export type UserArtistCreateNestedManyWithoutArtistInput = {
    create?: XOR<UserArtistCreateWithoutArtistInput, UserArtistUncheckedCreateWithoutArtistInput> | UserArtistCreateWithoutArtistInput[] | UserArtistUncheckedCreateWithoutArtistInput[]
    connectOrCreate?: UserArtistCreateOrConnectWithoutArtistInput | UserArtistCreateOrConnectWithoutArtistInput[]
    createMany?: UserArtistCreateManyArtistInputEnvelope
    connect?: UserArtistWhereUniqueInput | UserArtistWhereUniqueInput[]
  }

  export type SetlistCreateNestedManyWithoutArtistInput = {
    create?: XOR<SetlistCreateWithoutArtistInput, SetlistUncheckedCreateWithoutArtistInput> | SetlistCreateWithoutArtistInput[] | SetlistUncheckedCreateWithoutArtistInput[]
    connectOrCreate?: SetlistCreateOrConnectWithoutArtistInput | SetlistCreateOrConnectWithoutArtistInput[]
    createMany?: SetlistCreateManyArtistInputEnvelope
    connect?: SetlistWhereUniqueInput | SetlistWhereUniqueInput[]
  }

  export type ConcertUncheckedCreateNestedManyWithoutArtistInput = {
    create?: XOR<ConcertCreateWithoutArtistInput, ConcertUncheckedCreateWithoutArtistInput> | ConcertCreateWithoutArtistInput[] | ConcertUncheckedCreateWithoutArtistInput[]
    connectOrCreate?: ConcertCreateOrConnectWithoutArtistInput | ConcertCreateOrConnectWithoutArtistInput[]
    createMany?: ConcertCreateManyArtistInputEnvelope
    connect?: ConcertWhereUniqueInput | ConcertWhereUniqueInput[]
  }

  export type UserArtistUncheckedCreateNestedManyWithoutArtistInput = {
    create?: XOR<UserArtistCreateWithoutArtistInput, UserArtistUncheckedCreateWithoutArtistInput> | UserArtistCreateWithoutArtistInput[] | UserArtistUncheckedCreateWithoutArtistInput[]
    connectOrCreate?: UserArtistCreateOrConnectWithoutArtistInput | UserArtistCreateOrConnectWithoutArtistInput[]
    createMany?: UserArtistCreateManyArtistInputEnvelope
    connect?: UserArtistWhereUniqueInput | UserArtistWhereUniqueInput[]
  }

  export type SetlistUncheckedCreateNestedManyWithoutArtistInput = {
    create?: XOR<SetlistCreateWithoutArtistInput, SetlistUncheckedCreateWithoutArtistInput> | SetlistCreateWithoutArtistInput[] | SetlistUncheckedCreateWithoutArtistInput[]
    connectOrCreate?: SetlistCreateOrConnectWithoutArtistInput | SetlistCreateOrConnectWithoutArtistInput[]
    createMany?: SetlistCreateManyArtistInputEnvelope
    connect?: SetlistWhereUniqueInput | SetlistWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ConcertUpdateManyWithoutArtistNestedInput = {
    create?: XOR<ConcertCreateWithoutArtistInput, ConcertUncheckedCreateWithoutArtistInput> | ConcertCreateWithoutArtistInput[] | ConcertUncheckedCreateWithoutArtistInput[]
    connectOrCreate?: ConcertCreateOrConnectWithoutArtistInput | ConcertCreateOrConnectWithoutArtistInput[]
    upsert?: ConcertUpsertWithWhereUniqueWithoutArtistInput | ConcertUpsertWithWhereUniqueWithoutArtistInput[]
    createMany?: ConcertCreateManyArtistInputEnvelope
    set?: ConcertWhereUniqueInput | ConcertWhereUniqueInput[]
    disconnect?: ConcertWhereUniqueInput | ConcertWhereUniqueInput[]
    delete?: ConcertWhereUniqueInput | ConcertWhereUniqueInput[]
    connect?: ConcertWhereUniqueInput | ConcertWhereUniqueInput[]
    update?: ConcertUpdateWithWhereUniqueWithoutArtistInput | ConcertUpdateWithWhereUniqueWithoutArtistInput[]
    updateMany?: ConcertUpdateManyWithWhereWithoutArtistInput | ConcertUpdateManyWithWhereWithoutArtistInput[]
    deleteMany?: ConcertScalarWhereInput | ConcertScalarWhereInput[]
  }

  export type UserArtistUpdateManyWithoutArtistNestedInput = {
    create?: XOR<UserArtistCreateWithoutArtistInput, UserArtistUncheckedCreateWithoutArtistInput> | UserArtistCreateWithoutArtistInput[] | UserArtistUncheckedCreateWithoutArtistInput[]
    connectOrCreate?: UserArtistCreateOrConnectWithoutArtistInput | UserArtistCreateOrConnectWithoutArtistInput[]
    upsert?: UserArtistUpsertWithWhereUniqueWithoutArtistInput | UserArtistUpsertWithWhereUniqueWithoutArtistInput[]
    createMany?: UserArtistCreateManyArtistInputEnvelope
    set?: UserArtistWhereUniqueInput | UserArtistWhereUniqueInput[]
    disconnect?: UserArtistWhereUniqueInput | UserArtistWhereUniqueInput[]
    delete?: UserArtistWhereUniqueInput | UserArtistWhereUniqueInput[]
    connect?: UserArtistWhereUniqueInput | UserArtistWhereUniqueInput[]
    update?: UserArtistUpdateWithWhereUniqueWithoutArtistInput | UserArtistUpdateWithWhereUniqueWithoutArtistInput[]
    updateMany?: UserArtistUpdateManyWithWhereWithoutArtistInput | UserArtistUpdateManyWithWhereWithoutArtistInput[]
    deleteMany?: UserArtistScalarWhereInput | UserArtistScalarWhereInput[]
  }

  export type SetlistUpdateManyWithoutArtistNestedInput = {
    create?: XOR<SetlistCreateWithoutArtistInput, SetlistUncheckedCreateWithoutArtistInput> | SetlistCreateWithoutArtistInput[] | SetlistUncheckedCreateWithoutArtistInput[]
    connectOrCreate?: SetlistCreateOrConnectWithoutArtistInput | SetlistCreateOrConnectWithoutArtistInput[]
    upsert?: SetlistUpsertWithWhereUniqueWithoutArtistInput | SetlistUpsertWithWhereUniqueWithoutArtistInput[]
    createMany?: SetlistCreateManyArtistInputEnvelope
    set?: SetlistWhereUniqueInput | SetlistWhereUniqueInput[]
    disconnect?: SetlistWhereUniqueInput | SetlistWhereUniqueInput[]
    delete?: SetlistWhereUniqueInput | SetlistWhereUniqueInput[]
    connect?: SetlistWhereUniqueInput | SetlistWhereUniqueInput[]
    update?: SetlistUpdateWithWhereUniqueWithoutArtistInput | SetlistUpdateWithWhereUniqueWithoutArtistInput[]
    updateMany?: SetlistUpdateManyWithWhereWithoutArtistInput | SetlistUpdateManyWithWhereWithoutArtistInput[]
    deleteMany?: SetlistScalarWhereInput | SetlistScalarWhereInput[]
  }

  export type ConcertUncheckedUpdateManyWithoutArtistNestedInput = {
    create?: XOR<ConcertCreateWithoutArtistInput, ConcertUncheckedCreateWithoutArtistInput> | ConcertCreateWithoutArtistInput[] | ConcertUncheckedCreateWithoutArtistInput[]
    connectOrCreate?: ConcertCreateOrConnectWithoutArtistInput | ConcertCreateOrConnectWithoutArtistInput[]
    upsert?: ConcertUpsertWithWhereUniqueWithoutArtistInput | ConcertUpsertWithWhereUniqueWithoutArtistInput[]
    createMany?: ConcertCreateManyArtistInputEnvelope
    set?: ConcertWhereUniqueInput | ConcertWhereUniqueInput[]
    disconnect?: ConcertWhereUniqueInput | ConcertWhereUniqueInput[]
    delete?: ConcertWhereUniqueInput | ConcertWhereUniqueInput[]
    connect?: ConcertWhereUniqueInput | ConcertWhereUniqueInput[]
    update?: ConcertUpdateWithWhereUniqueWithoutArtistInput | ConcertUpdateWithWhereUniqueWithoutArtistInput[]
    updateMany?: ConcertUpdateManyWithWhereWithoutArtistInput | ConcertUpdateManyWithWhereWithoutArtistInput[]
    deleteMany?: ConcertScalarWhereInput | ConcertScalarWhereInput[]
  }

  export type UserArtistUncheckedUpdateManyWithoutArtistNestedInput = {
    create?: XOR<UserArtistCreateWithoutArtistInput, UserArtistUncheckedCreateWithoutArtistInput> | UserArtistCreateWithoutArtistInput[] | UserArtistUncheckedCreateWithoutArtistInput[]
    connectOrCreate?: UserArtistCreateOrConnectWithoutArtistInput | UserArtistCreateOrConnectWithoutArtistInput[]
    upsert?: UserArtistUpsertWithWhereUniqueWithoutArtistInput | UserArtistUpsertWithWhereUniqueWithoutArtistInput[]
    createMany?: UserArtistCreateManyArtistInputEnvelope
    set?: UserArtistWhereUniqueInput | UserArtistWhereUniqueInput[]
    disconnect?: UserArtistWhereUniqueInput | UserArtistWhereUniqueInput[]
    delete?: UserArtistWhereUniqueInput | UserArtistWhereUniqueInput[]
    connect?: UserArtistWhereUniqueInput | UserArtistWhereUniqueInput[]
    update?: UserArtistUpdateWithWhereUniqueWithoutArtistInput | UserArtistUpdateWithWhereUniqueWithoutArtistInput[]
    updateMany?: UserArtistUpdateManyWithWhereWithoutArtistInput | UserArtistUpdateManyWithWhereWithoutArtistInput[]
    deleteMany?: UserArtistScalarWhereInput | UserArtistScalarWhereInput[]
  }

  export type SetlistUncheckedUpdateManyWithoutArtistNestedInput = {
    create?: XOR<SetlistCreateWithoutArtistInput, SetlistUncheckedCreateWithoutArtistInput> | SetlistCreateWithoutArtistInput[] | SetlistUncheckedCreateWithoutArtistInput[]
    connectOrCreate?: SetlistCreateOrConnectWithoutArtistInput | SetlistCreateOrConnectWithoutArtistInput[]
    upsert?: SetlistUpsertWithWhereUniqueWithoutArtistInput | SetlistUpsertWithWhereUniqueWithoutArtistInput[]
    createMany?: SetlistCreateManyArtistInputEnvelope
    set?: SetlistWhereUniqueInput | SetlistWhereUniqueInput[]
    disconnect?: SetlistWhereUniqueInput | SetlistWhereUniqueInput[]
    delete?: SetlistWhereUniqueInput | SetlistWhereUniqueInput[]
    connect?: SetlistWhereUniqueInput | SetlistWhereUniqueInput[]
    update?: SetlistUpdateWithWhereUniqueWithoutArtistInput | SetlistUpdateWithWhereUniqueWithoutArtistInput[]
    updateMany?: SetlistUpdateManyWithWhereWithoutArtistInput | SetlistUpdateManyWithWhereWithoutArtistInput[]
    deleteMany?: SetlistScalarWhereInput | SetlistScalarWhereInput[]
  }

  export type ArtistCreateNestedOneWithoutConcertsInput = {
    create?: XOR<ArtistCreateWithoutConcertsInput, ArtistUncheckedCreateWithoutConcertsInput>
    connectOrCreate?: ArtistCreateOrConnectWithoutConcertsInput
    connect?: ArtistWhereUniqueInput
  }

  export type BookingLinkCreateNestedManyWithoutConcertInput = {
    create?: XOR<BookingLinkCreateWithoutConcertInput, BookingLinkUncheckedCreateWithoutConcertInput> | BookingLinkCreateWithoutConcertInput[] | BookingLinkUncheckedCreateWithoutConcertInput[]
    connectOrCreate?: BookingLinkCreateOrConnectWithoutConcertInput | BookingLinkCreateOrConnectWithoutConcertInput[]
    createMany?: BookingLinkCreateManyConcertInputEnvelope
    connect?: BookingLinkWhereUniqueInput | BookingLinkWhereUniqueInput[]
  }

  export type SetlistCreateNestedManyWithoutConcertInput = {
    create?: XOR<SetlistCreateWithoutConcertInput, SetlistUncheckedCreateWithoutConcertInput> | SetlistCreateWithoutConcertInput[] | SetlistUncheckedCreateWithoutConcertInput[]
    connectOrCreate?: SetlistCreateOrConnectWithoutConcertInput | SetlistCreateOrConnectWithoutConcertInput[]
    createMany?: SetlistCreateManyConcertInputEnvelope
    connect?: SetlistWhereUniqueInput | SetlistWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutConcertInput = {
    create?: XOR<NotificationCreateWithoutConcertInput, NotificationUncheckedCreateWithoutConcertInput> | NotificationCreateWithoutConcertInput[] | NotificationUncheckedCreateWithoutConcertInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutConcertInput | NotificationCreateOrConnectWithoutConcertInput[]
    createMany?: NotificationCreateManyConcertInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type BookingLinkUncheckedCreateNestedManyWithoutConcertInput = {
    create?: XOR<BookingLinkCreateWithoutConcertInput, BookingLinkUncheckedCreateWithoutConcertInput> | BookingLinkCreateWithoutConcertInput[] | BookingLinkUncheckedCreateWithoutConcertInput[]
    connectOrCreate?: BookingLinkCreateOrConnectWithoutConcertInput | BookingLinkCreateOrConnectWithoutConcertInput[]
    createMany?: BookingLinkCreateManyConcertInputEnvelope
    connect?: BookingLinkWhereUniqueInput | BookingLinkWhereUniqueInput[]
  }

  export type SetlistUncheckedCreateNestedManyWithoutConcertInput = {
    create?: XOR<SetlistCreateWithoutConcertInput, SetlistUncheckedCreateWithoutConcertInput> | SetlistCreateWithoutConcertInput[] | SetlistUncheckedCreateWithoutConcertInput[]
    connectOrCreate?: SetlistCreateOrConnectWithoutConcertInput | SetlistCreateOrConnectWithoutConcertInput[]
    createMany?: SetlistCreateManyConcertInputEnvelope
    connect?: SetlistWhereUniqueInput | SetlistWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutConcertInput = {
    create?: XOR<NotificationCreateWithoutConcertInput, NotificationUncheckedCreateWithoutConcertInput> | NotificationCreateWithoutConcertInput[] | NotificationUncheckedCreateWithoutConcertInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutConcertInput | NotificationCreateOrConnectWithoutConcertInput[]
    createMany?: NotificationCreateManyConcertInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type ArtistUpdateOneWithoutConcertsNestedInput = {
    create?: XOR<ArtistCreateWithoutConcertsInput, ArtistUncheckedCreateWithoutConcertsInput>
    connectOrCreate?: ArtistCreateOrConnectWithoutConcertsInput
    upsert?: ArtistUpsertWithoutConcertsInput
    disconnect?: ArtistWhereInput | boolean
    delete?: ArtistWhereInput | boolean
    connect?: ArtistWhereUniqueInput
    update?: XOR<XOR<ArtistUpdateToOneWithWhereWithoutConcertsInput, ArtistUpdateWithoutConcertsInput>, ArtistUncheckedUpdateWithoutConcertsInput>
  }

  export type BookingLinkUpdateManyWithoutConcertNestedInput = {
    create?: XOR<BookingLinkCreateWithoutConcertInput, BookingLinkUncheckedCreateWithoutConcertInput> | BookingLinkCreateWithoutConcertInput[] | BookingLinkUncheckedCreateWithoutConcertInput[]
    connectOrCreate?: BookingLinkCreateOrConnectWithoutConcertInput | BookingLinkCreateOrConnectWithoutConcertInput[]
    upsert?: BookingLinkUpsertWithWhereUniqueWithoutConcertInput | BookingLinkUpsertWithWhereUniqueWithoutConcertInput[]
    createMany?: BookingLinkCreateManyConcertInputEnvelope
    set?: BookingLinkWhereUniqueInput | BookingLinkWhereUniqueInput[]
    disconnect?: BookingLinkWhereUniqueInput | BookingLinkWhereUniqueInput[]
    delete?: BookingLinkWhereUniqueInput | BookingLinkWhereUniqueInput[]
    connect?: BookingLinkWhereUniqueInput | BookingLinkWhereUniqueInput[]
    update?: BookingLinkUpdateWithWhereUniqueWithoutConcertInput | BookingLinkUpdateWithWhereUniqueWithoutConcertInput[]
    updateMany?: BookingLinkUpdateManyWithWhereWithoutConcertInput | BookingLinkUpdateManyWithWhereWithoutConcertInput[]
    deleteMany?: BookingLinkScalarWhereInput | BookingLinkScalarWhereInput[]
  }

  export type SetlistUpdateManyWithoutConcertNestedInput = {
    create?: XOR<SetlistCreateWithoutConcertInput, SetlistUncheckedCreateWithoutConcertInput> | SetlistCreateWithoutConcertInput[] | SetlistUncheckedCreateWithoutConcertInput[]
    connectOrCreate?: SetlistCreateOrConnectWithoutConcertInput | SetlistCreateOrConnectWithoutConcertInput[]
    upsert?: SetlistUpsertWithWhereUniqueWithoutConcertInput | SetlistUpsertWithWhereUniqueWithoutConcertInput[]
    createMany?: SetlistCreateManyConcertInputEnvelope
    set?: SetlistWhereUniqueInput | SetlistWhereUniqueInput[]
    disconnect?: SetlistWhereUniqueInput | SetlistWhereUniqueInput[]
    delete?: SetlistWhereUniqueInput | SetlistWhereUniqueInput[]
    connect?: SetlistWhereUniqueInput | SetlistWhereUniqueInput[]
    update?: SetlistUpdateWithWhereUniqueWithoutConcertInput | SetlistUpdateWithWhereUniqueWithoutConcertInput[]
    updateMany?: SetlistUpdateManyWithWhereWithoutConcertInput | SetlistUpdateManyWithWhereWithoutConcertInput[]
    deleteMany?: SetlistScalarWhereInput | SetlistScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutConcertNestedInput = {
    create?: XOR<NotificationCreateWithoutConcertInput, NotificationUncheckedCreateWithoutConcertInput> | NotificationCreateWithoutConcertInput[] | NotificationUncheckedCreateWithoutConcertInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutConcertInput | NotificationCreateOrConnectWithoutConcertInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutConcertInput | NotificationUpsertWithWhereUniqueWithoutConcertInput[]
    createMany?: NotificationCreateManyConcertInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutConcertInput | NotificationUpdateWithWhereUniqueWithoutConcertInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutConcertInput | NotificationUpdateManyWithWhereWithoutConcertInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type BookingLinkUncheckedUpdateManyWithoutConcertNestedInput = {
    create?: XOR<BookingLinkCreateWithoutConcertInput, BookingLinkUncheckedCreateWithoutConcertInput> | BookingLinkCreateWithoutConcertInput[] | BookingLinkUncheckedCreateWithoutConcertInput[]
    connectOrCreate?: BookingLinkCreateOrConnectWithoutConcertInput | BookingLinkCreateOrConnectWithoutConcertInput[]
    upsert?: BookingLinkUpsertWithWhereUniqueWithoutConcertInput | BookingLinkUpsertWithWhereUniqueWithoutConcertInput[]
    createMany?: BookingLinkCreateManyConcertInputEnvelope
    set?: BookingLinkWhereUniqueInput | BookingLinkWhereUniqueInput[]
    disconnect?: BookingLinkWhereUniqueInput | BookingLinkWhereUniqueInput[]
    delete?: BookingLinkWhereUniqueInput | BookingLinkWhereUniqueInput[]
    connect?: BookingLinkWhereUniqueInput | BookingLinkWhereUniqueInput[]
    update?: BookingLinkUpdateWithWhereUniqueWithoutConcertInput | BookingLinkUpdateWithWhereUniqueWithoutConcertInput[]
    updateMany?: BookingLinkUpdateManyWithWhereWithoutConcertInput | BookingLinkUpdateManyWithWhereWithoutConcertInput[]
    deleteMany?: BookingLinkScalarWhereInput | BookingLinkScalarWhereInput[]
  }

  export type SetlistUncheckedUpdateManyWithoutConcertNestedInput = {
    create?: XOR<SetlistCreateWithoutConcertInput, SetlistUncheckedCreateWithoutConcertInput> | SetlistCreateWithoutConcertInput[] | SetlistUncheckedCreateWithoutConcertInput[]
    connectOrCreate?: SetlistCreateOrConnectWithoutConcertInput | SetlistCreateOrConnectWithoutConcertInput[]
    upsert?: SetlistUpsertWithWhereUniqueWithoutConcertInput | SetlistUpsertWithWhereUniqueWithoutConcertInput[]
    createMany?: SetlistCreateManyConcertInputEnvelope
    set?: SetlistWhereUniqueInput | SetlistWhereUniqueInput[]
    disconnect?: SetlistWhereUniqueInput | SetlistWhereUniqueInput[]
    delete?: SetlistWhereUniqueInput | SetlistWhereUniqueInput[]
    connect?: SetlistWhereUniqueInput | SetlistWhereUniqueInput[]
    update?: SetlistUpdateWithWhereUniqueWithoutConcertInput | SetlistUpdateWithWhereUniqueWithoutConcertInput[]
    updateMany?: SetlistUpdateManyWithWhereWithoutConcertInput | SetlistUpdateManyWithWhereWithoutConcertInput[]
    deleteMany?: SetlistScalarWhereInput | SetlistScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutConcertNestedInput = {
    create?: XOR<NotificationCreateWithoutConcertInput, NotificationUncheckedCreateWithoutConcertInput> | NotificationCreateWithoutConcertInput[] | NotificationUncheckedCreateWithoutConcertInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutConcertInput | NotificationCreateOrConnectWithoutConcertInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutConcertInput | NotificationUpsertWithWhereUniqueWithoutConcertInput[]
    createMany?: NotificationCreateManyConcertInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutConcertInput | NotificationUpdateWithWhereUniqueWithoutConcertInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutConcertInput | NotificationUpdateManyWithWhereWithoutConcertInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type ConcertCreateNestedOneWithoutBookingLinksInput = {
    create?: XOR<ConcertCreateWithoutBookingLinksInput, ConcertUncheckedCreateWithoutBookingLinksInput>
    connectOrCreate?: ConcertCreateOrConnectWithoutBookingLinksInput
    connect?: ConcertWhereUniqueInput
  }

  export type ConcertUpdateOneRequiredWithoutBookingLinksNestedInput = {
    create?: XOR<ConcertCreateWithoutBookingLinksInput, ConcertUncheckedCreateWithoutBookingLinksInput>
    connectOrCreate?: ConcertCreateOrConnectWithoutBookingLinksInput
    upsert?: ConcertUpsertWithoutBookingLinksInput
    connect?: ConcertWhereUniqueInput
    update?: XOR<XOR<ConcertUpdateToOneWithWhereWithoutBookingLinksInput, ConcertUpdateWithoutBookingLinksInput>, ConcertUncheckedUpdateWithoutBookingLinksInput>
  }

  export type UserCreateNestedOneWithoutFollowedArtistsInput = {
    create?: XOR<UserCreateWithoutFollowedArtistsInput, UserUncheckedCreateWithoutFollowedArtistsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowedArtistsInput
    connect?: UserWhereUniqueInput
  }

  export type ArtistCreateNestedOneWithoutFollowersInput = {
    create?: XOR<ArtistCreateWithoutFollowersInput, ArtistUncheckedCreateWithoutFollowersInput>
    connectOrCreate?: ArtistCreateOrConnectWithoutFollowersInput
    connect?: ArtistWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFollowedArtistsNestedInput = {
    create?: XOR<UserCreateWithoutFollowedArtistsInput, UserUncheckedCreateWithoutFollowedArtistsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowedArtistsInput
    upsert?: UserUpsertWithoutFollowedArtistsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFollowedArtistsInput, UserUpdateWithoutFollowedArtistsInput>, UserUncheckedUpdateWithoutFollowedArtistsInput>
  }

  export type ArtistUpdateOneRequiredWithoutFollowersNestedInput = {
    create?: XOR<ArtistCreateWithoutFollowersInput, ArtistUncheckedCreateWithoutFollowersInput>
    connectOrCreate?: ArtistCreateOrConnectWithoutFollowersInput
    upsert?: ArtistUpsertWithoutFollowersInput
    connect?: ArtistWhereUniqueInput
    update?: XOR<XOR<ArtistUpdateToOneWithWhereWithoutFollowersInput, ArtistUpdateWithoutFollowersInput>, ArtistUncheckedUpdateWithoutFollowersInput>
  }

  export type ConcertCreateNestedOneWithoutSetlistsInput = {
    create?: XOR<ConcertCreateWithoutSetlistsInput, ConcertUncheckedCreateWithoutSetlistsInput>
    connectOrCreate?: ConcertCreateOrConnectWithoutSetlistsInput
    connect?: ConcertWhereUniqueInput
  }

  export type ArtistCreateNestedOneWithoutSetlistsInput = {
    create?: XOR<ArtistCreateWithoutSetlistsInput, ArtistUncheckedCreateWithoutSetlistsInput>
    connectOrCreate?: ArtistCreateOrConnectWithoutSetlistsInput
    connect?: ArtistWhereUniqueInput
  }

  export type SetlistTrackCreateNestedManyWithoutSetlistInput = {
    create?: XOR<SetlistTrackCreateWithoutSetlistInput, SetlistTrackUncheckedCreateWithoutSetlistInput> | SetlistTrackCreateWithoutSetlistInput[] | SetlistTrackUncheckedCreateWithoutSetlistInput[]
    connectOrCreate?: SetlistTrackCreateOrConnectWithoutSetlistInput | SetlistTrackCreateOrConnectWithoutSetlistInput[]
    createMany?: SetlistTrackCreateManySetlistInputEnvelope
    connect?: SetlistTrackWhereUniqueInput | SetlistTrackWhereUniqueInput[]
  }

  export type SetlistTrackUncheckedCreateNestedManyWithoutSetlistInput = {
    create?: XOR<SetlistTrackCreateWithoutSetlistInput, SetlistTrackUncheckedCreateWithoutSetlistInput> | SetlistTrackCreateWithoutSetlistInput[] | SetlistTrackUncheckedCreateWithoutSetlistInput[]
    connectOrCreate?: SetlistTrackCreateOrConnectWithoutSetlistInput | SetlistTrackCreateOrConnectWithoutSetlistInput[]
    createMany?: SetlistTrackCreateManySetlistInputEnvelope
    connect?: SetlistTrackWhereUniqueInput | SetlistTrackWhereUniqueInput[]
  }

  export type ConcertUpdateOneWithoutSetlistsNestedInput = {
    create?: XOR<ConcertCreateWithoutSetlistsInput, ConcertUncheckedCreateWithoutSetlistsInput>
    connectOrCreate?: ConcertCreateOrConnectWithoutSetlistsInput
    upsert?: ConcertUpsertWithoutSetlistsInput
    disconnect?: ConcertWhereInput | boolean
    delete?: ConcertWhereInput | boolean
    connect?: ConcertWhereUniqueInput
    update?: XOR<XOR<ConcertUpdateToOneWithWhereWithoutSetlistsInput, ConcertUpdateWithoutSetlistsInput>, ConcertUncheckedUpdateWithoutSetlistsInput>
  }

  export type ArtistUpdateOneWithoutSetlistsNestedInput = {
    create?: XOR<ArtistCreateWithoutSetlistsInput, ArtistUncheckedCreateWithoutSetlistsInput>
    connectOrCreate?: ArtistCreateOrConnectWithoutSetlistsInput
    upsert?: ArtistUpsertWithoutSetlistsInput
    disconnect?: ArtistWhereInput | boolean
    delete?: ArtistWhereInput | boolean
    connect?: ArtistWhereUniqueInput
    update?: XOR<XOR<ArtistUpdateToOneWithWhereWithoutSetlistsInput, ArtistUpdateWithoutSetlistsInput>, ArtistUncheckedUpdateWithoutSetlistsInput>
  }

  export type SetlistTrackUpdateManyWithoutSetlistNestedInput = {
    create?: XOR<SetlistTrackCreateWithoutSetlistInput, SetlistTrackUncheckedCreateWithoutSetlistInput> | SetlistTrackCreateWithoutSetlistInput[] | SetlistTrackUncheckedCreateWithoutSetlistInput[]
    connectOrCreate?: SetlistTrackCreateOrConnectWithoutSetlistInput | SetlistTrackCreateOrConnectWithoutSetlistInput[]
    upsert?: SetlistTrackUpsertWithWhereUniqueWithoutSetlistInput | SetlistTrackUpsertWithWhereUniqueWithoutSetlistInput[]
    createMany?: SetlistTrackCreateManySetlistInputEnvelope
    set?: SetlistTrackWhereUniqueInput | SetlistTrackWhereUniqueInput[]
    disconnect?: SetlistTrackWhereUniqueInput | SetlistTrackWhereUniqueInput[]
    delete?: SetlistTrackWhereUniqueInput | SetlistTrackWhereUniqueInput[]
    connect?: SetlistTrackWhereUniqueInput | SetlistTrackWhereUniqueInput[]
    update?: SetlistTrackUpdateWithWhereUniqueWithoutSetlistInput | SetlistTrackUpdateWithWhereUniqueWithoutSetlistInput[]
    updateMany?: SetlistTrackUpdateManyWithWhereWithoutSetlistInput | SetlistTrackUpdateManyWithWhereWithoutSetlistInput[]
    deleteMany?: SetlistTrackScalarWhereInput | SetlistTrackScalarWhereInput[]
  }

  export type SetlistTrackUncheckedUpdateManyWithoutSetlistNestedInput = {
    create?: XOR<SetlistTrackCreateWithoutSetlistInput, SetlistTrackUncheckedCreateWithoutSetlistInput> | SetlistTrackCreateWithoutSetlistInput[] | SetlistTrackUncheckedCreateWithoutSetlistInput[]
    connectOrCreate?: SetlistTrackCreateOrConnectWithoutSetlistInput | SetlistTrackCreateOrConnectWithoutSetlistInput[]
    upsert?: SetlistTrackUpsertWithWhereUniqueWithoutSetlistInput | SetlistTrackUpsertWithWhereUniqueWithoutSetlistInput[]
    createMany?: SetlistTrackCreateManySetlistInputEnvelope
    set?: SetlistTrackWhereUniqueInput | SetlistTrackWhereUniqueInput[]
    disconnect?: SetlistTrackWhereUniqueInput | SetlistTrackWhereUniqueInput[]
    delete?: SetlistTrackWhereUniqueInput | SetlistTrackWhereUniqueInput[]
    connect?: SetlistTrackWhereUniqueInput | SetlistTrackWhereUniqueInput[]
    update?: SetlistTrackUpdateWithWhereUniqueWithoutSetlistInput | SetlistTrackUpdateWithWhereUniqueWithoutSetlistInput[]
    updateMany?: SetlistTrackUpdateManyWithWhereWithoutSetlistInput | SetlistTrackUpdateManyWithWhereWithoutSetlistInput[]
    deleteMany?: SetlistTrackScalarWhereInput | SetlistTrackScalarWhereInput[]
  }

  export type SetlistCreateNestedOneWithoutTracksInput = {
    create?: XOR<SetlistCreateWithoutTracksInput, SetlistUncheckedCreateWithoutTracksInput>
    connectOrCreate?: SetlistCreateOrConnectWithoutTracksInput
    connect?: SetlistWhereUniqueInput
  }

  export type SetlistUpdateOneRequiredWithoutTracksNestedInput = {
    create?: XOR<SetlistCreateWithoutTracksInput, SetlistUncheckedCreateWithoutTracksInput>
    connectOrCreate?: SetlistCreateOrConnectWithoutTracksInput
    upsert?: SetlistUpsertWithoutTracksInput
    connect?: SetlistWhereUniqueInput
    update?: XOR<XOR<SetlistUpdateToOneWithWhereWithoutTracksInput, SetlistUpdateWithoutTracksInput>, SetlistUncheckedUpdateWithoutTracksInput>
  }

  export type UserCreateNestedOneWithoutNotificationSettingsInput = {
    create?: XOR<UserCreateWithoutNotificationSettingsInput, UserUncheckedCreateWithoutNotificationSettingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationSettingsInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutNotificationSettingsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationSettingsInput, UserUncheckedCreateWithoutNotificationSettingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationSettingsInput
    upsert?: UserUpsertWithoutNotificationSettingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationSettingsInput, UserUpdateWithoutNotificationSettingsInput>, UserUncheckedUpdateWithoutNotificationSettingsInput>
  }

  export type UserCreateNestedOneWithoutDevicesInput = {
    create?: XOR<UserCreateWithoutDevicesInput, UserUncheckedCreateWithoutDevicesInput>
    connectOrCreate?: UserCreateOrConnectWithoutDevicesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutDevicesNestedInput = {
    create?: XOR<UserCreateWithoutDevicesInput, UserUncheckedCreateWithoutDevicesInput>
    connectOrCreate?: UserCreateOrConnectWithoutDevicesInput
    upsert?: UserUpsertWithoutDevicesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDevicesInput, UserUpdateWithoutDevicesInput>, UserUncheckedUpdateWithoutDevicesInput>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type ConcertCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<ConcertCreateWithoutNotificationsInput, ConcertUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: ConcertCreateOrConnectWithoutNotificationsInput
    connect?: ConcertWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type ConcertUpdateOneWithoutNotificationsNestedInput = {
    create?: XOR<ConcertCreateWithoutNotificationsInput, ConcertUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: ConcertCreateOrConnectWithoutNotificationsInput
    upsert?: ConcertUpsertWithoutNotificationsInput
    disconnect?: ConcertWhereInput | boolean
    delete?: ConcertWhereInput | boolean
    connect?: ConcertWhereUniqueInput
    update?: XOR<XOR<ConcertUpdateToOneWithWhereWithoutNotificationsInput, ConcertUpdateWithoutNotificationsInput>, ConcertUncheckedUpdateWithoutNotificationsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserArtistCreateWithoutUserInput = {
    createdAt?: Date | string
    artist: ArtistCreateNestedOneWithoutFollowersInput
  }

  export type UserArtistUncheckedCreateWithoutUserInput = {
    id?: number
    artistId: string
    createdAt?: Date | string
  }

  export type UserArtistCreateOrConnectWithoutUserInput = {
    where: UserArtistWhereUniqueInput
    create: XOR<UserArtistCreateWithoutUserInput, UserArtistUncheckedCreateWithoutUserInput>
  }

  export type UserArtistCreateManyUserInputEnvelope = {
    data: UserArtistCreateManyUserInput | UserArtistCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NotificationSettingsCreateWithoutUserInput = {
    ticketOpenAlert?: boolean
    concertRegistrationAlert?: boolean
    emailNotification?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationSettingsUncheckedCreateWithoutUserInput = {
    id?: number
    ticketOpenAlert?: boolean
    concertRegistrationAlert?: boolean
    emailNotification?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationSettingsCreateOrConnectWithoutUserInput = {
    where: NotificationSettingsWhereUniqueInput
    create: XOR<NotificationSettingsCreateWithoutUserInput, NotificationSettingsUncheckedCreateWithoutUserInput>
  }

  export type UserDeviceCreateWithoutUserInput = {
    fcmToken: string
    platform: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserDeviceUncheckedCreateWithoutUserInput = {
    id?: number
    fcmToken: string
    platform: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserDeviceCreateOrConnectWithoutUserInput = {
    where: UserDeviceWhereUniqueInput
    create: XOR<UserDeviceCreateWithoutUserInput, UserDeviceUncheckedCreateWithoutUserInput>
  }

  export type UserDeviceCreateManyUserInputEnvelope = {
    data: UserDeviceCreateManyUserInput | UserDeviceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutUserInput = {
    type: string
    title: string
    body: string
    readAt?: Date | string | null
    sentAt?: Date | string
    createdAt?: Date | string
    concert?: ConcertCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: number
    type: string
    title: string
    body: string
    concertId?: string | null
    readAt?: Date | string | null
    sentAt?: Date | string
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type UserArtistUpsertWithWhereUniqueWithoutUserInput = {
    where: UserArtistWhereUniqueInput
    update: XOR<UserArtistUpdateWithoutUserInput, UserArtistUncheckedUpdateWithoutUserInput>
    create: XOR<UserArtistCreateWithoutUserInput, UserArtistUncheckedCreateWithoutUserInput>
  }

  export type UserArtistUpdateWithWhereUniqueWithoutUserInput = {
    where: UserArtistWhereUniqueInput
    data: XOR<UserArtistUpdateWithoutUserInput, UserArtistUncheckedUpdateWithoutUserInput>
  }

  export type UserArtistUpdateManyWithWhereWithoutUserInput = {
    where: UserArtistScalarWhereInput
    data: XOR<UserArtistUpdateManyMutationInput, UserArtistUncheckedUpdateManyWithoutUserInput>
  }

  export type UserArtistScalarWhereInput = {
    AND?: UserArtistScalarWhereInput | UserArtistScalarWhereInput[]
    OR?: UserArtistScalarWhereInput[]
    NOT?: UserArtistScalarWhereInput | UserArtistScalarWhereInput[]
    id?: IntFilter<"UserArtist"> | number
    userId?: StringFilter<"UserArtist"> | string
    artistId?: StringFilter<"UserArtist"> | string
    createdAt?: DateTimeFilter<"UserArtist"> | Date | string
  }

  export type NotificationSettingsUpsertWithoutUserInput = {
    update: XOR<NotificationSettingsUpdateWithoutUserInput, NotificationSettingsUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationSettingsCreateWithoutUserInput, NotificationSettingsUncheckedCreateWithoutUserInput>
    where?: NotificationSettingsWhereInput
  }

  export type NotificationSettingsUpdateToOneWithWhereWithoutUserInput = {
    where?: NotificationSettingsWhereInput
    data: XOR<NotificationSettingsUpdateWithoutUserInput, NotificationSettingsUncheckedUpdateWithoutUserInput>
  }

  export type NotificationSettingsUpdateWithoutUserInput = {
    ticketOpenAlert?: BoolFieldUpdateOperationsInput | boolean
    concertRegistrationAlert?: BoolFieldUpdateOperationsInput | boolean
    emailNotification?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationSettingsUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    ticketOpenAlert?: BoolFieldUpdateOperationsInput | boolean
    concertRegistrationAlert?: BoolFieldUpdateOperationsInput | boolean
    emailNotification?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDeviceUpsertWithWhereUniqueWithoutUserInput = {
    where: UserDeviceWhereUniqueInput
    update: XOR<UserDeviceUpdateWithoutUserInput, UserDeviceUncheckedUpdateWithoutUserInput>
    create: XOR<UserDeviceCreateWithoutUserInput, UserDeviceUncheckedCreateWithoutUserInput>
  }

  export type UserDeviceUpdateWithWhereUniqueWithoutUserInput = {
    where: UserDeviceWhereUniqueInput
    data: XOR<UserDeviceUpdateWithoutUserInput, UserDeviceUncheckedUpdateWithoutUserInput>
  }

  export type UserDeviceUpdateManyWithWhereWithoutUserInput = {
    where: UserDeviceScalarWhereInput
    data: XOR<UserDeviceUpdateManyMutationInput, UserDeviceUncheckedUpdateManyWithoutUserInput>
  }

  export type UserDeviceScalarWhereInput = {
    AND?: UserDeviceScalarWhereInput | UserDeviceScalarWhereInput[]
    OR?: UserDeviceScalarWhereInput[]
    NOT?: UserDeviceScalarWhereInput | UserDeviceScalarWhereInput[]
    id?: IntFilter<"UserDevice"> | number
    userId?: StringFilter<"UserDevice"> | string
    fcmToken?: StringFilter<"UserDevice"> | string
    platform?: StringFilter<"UserDevice"> | string
    createdAt?: DateTimeFilter<"UserDevice"> | Date | string
    updatedAt?: DateTimeFilter<"UserDevice"> | Date | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: IntFilter<"Notification"> | number
    userId?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    body?: StringFilter<"Notification"> | string
    concertId?: StringNullableFilter<"Notification"> | string | null
    readAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
    sentAt?: DateTimeFilter<"Notification"> | Date | string
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    followedArtists?: UserArtistCreateNestedManyWithoutUserInput
    notificationSettings?: NotificationSettingsCreateNestedOneWithoutUserInput
    devices?: UserDeviceCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    followedArtists?: UserArtistUncheckedCreateNestedManyWithoutUserInput
    notificationSettings?: NotificationSettingsUncheckedCreateNestedOneWithoutUserInput
    devices?: UserDeviceUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    followedArtists?: UserArtistUpdateManyWithoutUserNestedInput
    notificationSettings?: NotificationSettingsUpdateOneWithoutUserNestedInput
    devices?: UserDeviceUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    followedArtists?: UserArtistUncheckedUpdateManyWithoutUserNestedInput
    notificationSettings?: NotificationSettingsUncheckedUpdateOneWithoutUserNestedInput
    devices?: UserDeviceUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    followedArtists?: UserArtistCreateNestedManyWithoutUserInput
    notificationSettings?: NotificationSettingsCreateNestedOneWithoutUserInput
    devices?: UserDeviceCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    followedArtists?: UserArtistUncheckedCreateNestedManyWithoutUserInput
    notificationSettings?: NotificationSettingsUncheckedCreateNestedOneWithoutUserInput
    devices?: UserDeviceUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    followedArtists?: UserArtistUpdateManyWithoutUserNestedInput
    notificationSettings?: NotificationSettingsUpdateOneWithoutUserNestedInput
    devices?: UserDeviceUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    followedArtists?: UserArtistUncheckedUpdateManyWithoutUserNestedInput
    notificationSettings?: NotificationSettingsUncheckedUpdateOneWithoutUserNestedInput
    devices?: UserDeviceUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ConcertCreateWithoutArtistInput = {
    id?: string
    kopisId?: string | null
    title: string
    poster?: string | null
    date: Date | string
    venueName: string
    venueAddress?: string | null
    venueMapLink?: string | null
    region?: string | null
    genre?: string | null
    description?: string | null
    ticketStatus?: string | null
    ticketOpenDate?: Date | string | null
    ticketPriceMin?: number | null
    ticketPriceMax?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookingLinks?: BookingLinkCreateNestedManyWithoutConcertInput
    setlists?: SetlistCreateNestedManyWithoutConcertInput
    notifications?: NotificationCreateNestedManyWithoutConcertInput
  }

  export type ConcertUncheckedCreateWithoutArtistInput = {
    id?: string
    kopisId?: string | null
    title: string
    poster?: string | null
    date: Date | string
    venueName: string
    venueAddress?: string | null
    venueMapLink?: string | null
    region?: string | null
    genre?: string | null
    description?: string | null
    ticketStatus?: string | null
    ticketOpenDate?: Date | string | null
    ticketPriceMin?: number | null
    ticketPriceMax?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookingLinks?: BookingLinkUncheckedCreateNestedManyWithoutConcertInput
    setlists?: SetlistUncheckedCreateNestedManyWithoutConcertInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutConcertInput
  }

  export type ConcertCreateOrConnectWithoutArtistInput = {
    where: ConcertWhereUniqueInput
    create: XOR<ConcertCreateWithoutArtistInput, ConcertUncheckedCreateWithoutArtistInput>
  }

  export type ConcertCreateManyArtistInputEnvelope = {
    data: ConcertCreateManyArtistInput | ConcertCreateManyArtistInput[]
    skipDuplicates?: boolean
  }

  export type UserArtistCreateWithoutArtistInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFollowedArtistsInput
  }

  export type UserArtistUncheckedCreateWithoutArtistInput = {
    id?: number
    userId: string
    createdAt?: Date | string
  }

  export type UserArtistCreateOrConnectWithoutArtistInput = {
    where: UserArtistWhereUniqueInput
    create: XOR<UserArtistCreateWithoutArtistInput, UserArtistUncheckedCreateWithoutArtistInput>
  }

  export type UserArtistCreateManyArtistInputEnvelope = {
    data: UserArtistCreateManyArtistInput | UserArtistCreateManyArtistInput[]
    skipDuplicates?: boolean
  }

  export type SetlistCreateWithoutArtistInput = {
    id?: string
    date?: Date | string | null
    venue?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    concert?: ConcertCreateNestedOneWithoutSetlistsInput
    tracks?: SetlistTrackCreateNestedManyWithoutSetlistInput
  }

  export type SetlistUncheckedCreateWithoutArtistInput = {
    id?: string
    concertId?: string | null
    date?: Date | string | null
    venue?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tracks?: SetlistTrackUncheckedCreateNestedManyWithoutSetlistInput
  }

  export type SetlistCreateOrConnectWithoutArtistInput = {
    where: SetlistWhereUniqueInput
    create: XOR<SetlistCreateWithoutArtistInput, SetlistUncheckedCreateWithoutArtistInput>
  }

  export type SetlistCreateManyArtistInputEnvelope = {
    data: SetlistCreateManyArtistInput | SetlistCreateManyArtistInput[]
    skipDuplicates?: boolean
  }

  export type ConcertUpsertWithWhereUniqueWithoutArtistInput = {
    where: ConcertWhereUniqueInput
    update: XOR<ConcertUpdateWithoutArtistInput, ConcertUncheckedUpdateWithoutArtistInput>
    create: XOR<ConcertCreateWithoutArtistInput, ConcertUncheckedCreateWithoutArtistInput>
  }

  export type ConcertUpdateWithWhereUniqueWithoutArtistInput = {
    where: ConcertWhereUniqueInput
    data: XOR<ConcertUpdateWithoutArtistInput, ConcertUncheckedUpdateWithoutArtistInput>
  }

  export type ConcertUpdateManyWithWhereWithoutArtistInput = {
    where: ConcertScalarWhereInput
    data: XOR<ConcertUpdateManyMutationInput, ConcertUncheckedUpdateManyWithoutArtistInput>
  }

  export type ConcertScalarWhereInput = {
    AND?: ConcertScalarWhereInput | ConcertScalarWhereInput[]
    OR?: ConcertScalarWhereInput[]
    NOT?: ConcertScalarWhereInput | ConcertScalarWhereInput[]
    id?: StringFilter<"Concert"> | string
    kopisId?: StringNullableFilter<"Concert"> | string | null
    title?: StringFilter<"Concert"> | string
    artistId?: StringNullableFilter<"Concert"> | string | null
    poster?: StringNullableFilter<"Concert"> | string | null
    date?: DateTimeFilter<"Concert"> | Date | string
    venueName?: StringFilter<"Concert"> | string
    venueAddress?: StringNullableFilter<"Concert"> | string | null
    venueMapLink?: StringNullableFilter<"Concert"> | string | null
    region?: StringNullableFilter<"Concert"> | string | null
    genre?: StringNullableFilter<"Concert"> | string | null
    description?: StringNullableFilter<"Concert"> | string | null
    ticketStatus?: StringNullableFilter<"Concert"> | string | null
    ticketOpenDate?: DateTimeNullableFilter<"Concert"> | Date | string | null
    ticketPriceMin?: IntNullableFilter<"Concert"> | number | null
    ticketPriceMax?: IntNullableFilter<"Concert"> | number | null
    createdAt?: DateTimeFilter<"Concert"> | Date | string
    updatedAt?: DateTimeFilter<"Concert"> | Date | string
  }

  export type UserArtistUpsertWithWhereUniqueWithoutArtistInput = {
    where: UserArtistWhereUniqueInput
    update: XOR<UserArtistUpdateWithoutArtistInput, UserArtistUncheckedUpdateWithoutArtistInput>
    create: XOR<UserArtistCreateWithoutArtistInput, UserArtistUncheckedCreateWithoutArtistInput>
  }

  export type UserArtistUpdateWithWhereUniqueWithoutArtistInput = {
    where: UserArtistWhereUniqueInput
    data: XOR<UserArtistUpdateWithoutArtistInput, UserArtistUncheckedUpdateWithoutArtistInput>
  }

  export type UserArtistUpdateManyWithWhereWithoutArtistInput = {
    where: UserArtistScalarWhereInput
    data: XOR<UserArtistUpdateManyMutationInput, UserArtistUncheckedUpdateManyWithoutArtistInput>
  }

  export type SetlistUpsertWithWhereUniqueWithoutArtistInput = {
    where: SetlistWhereUniqueInput
    update: XOR<SetlistUpdateWithoutArtistInput, SetlistUncheckedUpdateWithoutArtistInput>
    create: XOR<SetlistCreateWithoutArtistInput, SetlistUncheckedCreateWithoutArtistInput>
  }

  export type SetlistUpdateWithWhereUniqueWithoutArtistInput = {
    where: SetlistWhereUniqueInput
    data: XOR<SetlistUpdateWithoutArtistInput, SetlistUncheckedUpdateWithoutArtistInput>
  }

  export type SetlistUpdateManyWithWhereWithoutArtistInput = {
    where: SetlistScalarWhereInput
    data: XOR<SetlistUpdateManyMutationInput, SetlistUncheckedUpdateManyWithoutArtistInput>
  }

  export type SetlistScalarWhereInput = {
    AND?: SetlistScalarWhereInput | SetlistScalarWhereInput[]
    OR?: SetlistScalarWhereInput[]
    NOT?: SetlistScalarWhereInput | SetlistScalarWhereInput[]
    id?: StringFilter<"Setlist"> | string
    concertId?: StringNullableFilter<"Setlist"> | string | null
    artistId?: StringNullableFilter<"Setlist"> | string | null
    date?: DateTimeNullableFilter<"Setlist"> | Date | string | null
    venue?: StringNullableFilter<"Setlist"> | string | null
    createdAt?: DateTimeFilter<"Setlist"> | Date | string
    updatedAt?: DateTimeFilter<"Setlist"> | Date | string
  }

  export type ArtistCreateWithoutConcertsInput = {
    id?: string
    name: string
    image?: string | null
    genre?: string | null
    description?: string | null
    spotifyArtistId?: string | null
    followerCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    followers?: UserArtistCreateNestedManyWithoutArtistInput
    setlists?: SetlistCreateNestedManyWithoutArtistInput
  }

  export type ArtistUncheckedCreateWithoutConcertsInput = {
    id?: string
    name: string
    image?: string | null
    genre?: string | null
    description?: string | null
    spotifyArtistId?: string | null
    followerCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    followers?: UserArtistUncheckedCreateNestedManyWithoutArtistInput
    setlists?: SetlistUncheckedCreateNestedManyWithoutArtistInput
  }

  export type ArtistCreateOrConnectWithoutConcertsInput = {
    where: ArtistWhereUniqueInput
    create: XOR<ArtistCreateWithoutConcertsInput, ArtistUncheckedCreateWithoutConcertsInput>
  }

  export type BookingLinkCreateWithoutConcertInput = {
    platform: string
    url: string
    createdAt?: Date | string
  }

  export type BookingLinkUncheckedCreateWithoutConcertInput = {
    id?: number
    platform: string
    url: string
    createdAt?: Date | string
  }

  export type BookingLinkCreateOrConnectWithoutConcertInput = {
    where: BookingLinkWhereUniqueInput
    create: XOR<BookingLinkCreateWithoutConcertInput, BookingLinkUncheckedCreateWithoutConcertInput>
  }

  export type BookingLinkCreateManyConcertInputEnvelope = {
    data: BookingLinkCreateManyConcertInput | BookingLinkCreateManyConcertInput[]
    skipDuplicates?: boolean
  }

  export type SetlistCreateWithoutConcertInput = {
    id?: string
    date?: Date | string | null
    venue?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    artist?: ArtistCreateNestedOneWithoutSetlistsInput
    tracks?: SetlistTrackCreateNestedManyWithoutSetlistInput
  }

  export type SetlistUncheckedCreateWithoutConcertInput = {
    id?: string
    artistId?: string | null
    date?: Date | string | null
    venue?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tracks?: SetlistTrackUncheckedCreateNestedManyWithoutSetlistInput
  }

  export type SetlistCreateOrConnectWithoutConcertInput = {
    where: SetlistWhereUniqueInput
    create: XOR<SetlistCreateWithoutConcertInput, SetlistUncheckedCreateWithoutConcertInput>
  }

  export type SetlistCreateManyConcertInputEnvelope = {
    data: SetlistCreateManyConcertInput | SetlistCreateManyConcertInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutConcertInput = {
    type: string
    title: string
    body: string
    readAt?: Date | string | null
    sentAt?: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateWithoutConcertInput = {
    id?: number
    userId: string
    type: string
    title: string
    body: string
    readAt?: Date | string | null
    sentAt?: Date | string
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutConcertInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutConcertInput, NotificationUncheckedCreateWithoutConcertInput>
  }

  export type NotificationCreateManyConcertInputEnvelope = {
    data: NotificationCreateManyConcertInput | NotificationCreateManyConcertInput[]
    skipDuplicates?: boolean
  }

  export type ArtistUpsertWithoutConcertsInput = {
    update: XOR<ArtistUpdateWithoutConcertsInput, ArtistUncheckedUpdateWithoutConcertsInput>
    create: XOR<ArtistCreateWithoutConcertsInput, ArtistUncheckedCreateWithoutConcertsInput>
    where?: ArtistWhereInput
  }

  export type ArtistUpdateToOneWithWhereWithoutConcertsInput = {
    where?: ArtistWhereInput
    data: XOR<ArtistUpdateWithoutConcertsInput, ArtistUncheckedUpdateWithoutConcertsInput>
  }

  export type ArtistUpdateWithoutConcertsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    spotifyArtistId?: NullableStringFieldUpdateOperationsInput | string | null
    followerCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    followers?: UserArtistUpdateManyWithoutArtistNestedInput
    setlists?: SetlistUpdateManyWithoutArtistNestedInput
  }

  export type ArtistUncheckedUpdateWithoutConcertsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    spotifyArtistId?: NullableStringFieldUpdateOperationsInput | string | null
    followerCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    followers?: UserArtistUncheckedUpdateManyWithoutArtistNestedInput
    setlists?: SetlistUncheckedUpdateManyWithoutArtistNestedInput
  }

  export type BookingLinkUpsertWithWhereUniqueWithoutConcertInput = {
    where: BookingLinkWhereUniqueInput
    update: XOR<BookingLinkUpdateWithoutConcertInput, BookingLinkUncheckedUpdateWithoutConcertInput>
    create: XOR<BookingLinkCreateWithoutConcertInput, BookingLinkUncheckedCreateWithoutConcertInput>
  }

  export type BookingLinkUpdateWithWhereUniqueWithoutConcertInput = {
    where: BookingLinkWhereUniqueInput
    data: XOR<BookingLinkUpdateWithoutConcertInput, BookingLinkUncheckedUpdateWithoutConcertInput>
  }

  export type BookingLinkUpdateManyWithWhereWithoutConcertInput = {
    where: BookingLinkScalarWhereInput
    data: XOR<BookingLinkUpdateManyMutationInput, BookingLinkUncheckedUpdateManyWithoutConcertInput>
  }

  export type BookingLinkScalarWhereInput = {
    AND?: BookingLinkScalarWhereInput | BookingLinkScalarWhereInput[]
    OR?: BookingLinkScalarWhereInput[]
    NOT?: BookingLinkScalarWhereInput | BookingLinkScalarWhereInput[]
    id?: IntFilter<"BookingLink"> | number
    concertId?: StringFilter<"BookingLink"> | string
    platform?: StringFilter<"BookingLink"> | string
    url?: StringFilter<"BookingLink"> | string
    createdAt?: DateTimeFilter<"BookingLink"> | Date | string
  }

  export type SetlistUpsertWithWhereUniqueWithoutConcertInput = {
    where: SetlistWhereUniqueInput
    update: XOR<SetlistUpdateWithoutConcertInput, SetlistUncheckedUpdateWithoutConcertInput>
    create: XOR<SetlistCreateWithoutConcertInput, SetlistUncheckedCreateWithoutConcertInput>
  }

  export type SetlistUpdateWithWhereUniqueWithoutConcertInput = {
    where: SetlistWhereUniqueInput
    data: XOR<SetlistUpdateWithoutConcertInput, SetlistUncheckedUpdateWithoutConcertInput>
  }

  export type SetlistUpdateManyWithWhereWithoutConcertInput = {
    where: SetlistScalarWhereInput
    data: XOR<SetlistUpdateManyMutationInput, SetlistUncheckedUpdateManyWithoutConcertInput>
  }

  export type NotificationUpsertWithWhereUniqueWithoutConcertInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutConcertInput, NotificationUncheckedUpdateWithoutConcertInput>
    create: XOR<NotificationCreateWithoutConcertInput, NotificationUncheckedCreateWithoutConcertInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutConcertInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutConcertInput, NotificationUncheckedUpdateWithoutConcertInput>
  }

  export type NotificationUpdateManyWithWhereWithoutConcertInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutConcertInput>
  }

  export type ConcertCreateWithoutBookingLinksInput = {
    id?: string
    kopisId?: string | null
    title: string
    poster?: string | null
    date: Date | string
    venueName: string
    venueAddress?: string | null
    venueMapLink?: string | null
    region?: string | null
    genre?: string | null
    description?: string | null
    ticketStatus?: string | null
    ticketOpenDate?: Date | string | null
    ticketPriceMin?: number | null
    ticketPriceMax?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    artist?: ArtistCreateNestedOneWithoutConcertsInput
    setlists?: SetlistCreateNestedManyWithoutConcertInput
    notifications?: NotificationCreateNestedManyWithoutConcertInput
  }

  export type ConcertUncheckedCreateWithoutBookingLinksInput = {
    id?: string
    kopisId?: string | null
    title: string
    artistId?: string | null
    poster?: string | null
    date: Date | string
    venueName: string
    venueAddress?: string | null
    venueMapLink?: string | null
    region?: string | null
    genre?: string | null
    description?: string | null
    ticketStatus?: string | null
    ticketOpenDate?: Date | string | null
    ticketPriceMin?: number | null
    ticketPriceMax?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    setlists?: SetlistUncheckedCreateNestedManyWithoutConcertInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutConcertInput
  }

  export type ConcertCreateOrConnectWithoutBookingLinksInput = {
    where: ConcertWhereUniqueInput
    create: XOR<ConcertCreateWithoutBookingLinksInput, ConcertUncheckedCreateWithoutBookingLinksInput>
  }

  export type ConcertUpsertWithoutBookingLinksInput = {
    update: XOR<ConcertUpdateWithoutBookingLinksInput, ConcertUncheckedUpdateWithoutBookingLinksInput>
    create: XOR<ConcertCreateWithoutBookingLinksInput, ConcertUncheckedCreateWithoutBookingLinksInput>
    where?: ConcertWhereInput
  }

  export type ConcertUpdateToOneWithWhereWithoutBookingLinksInput = {
    where?: ConcertWhereInput
    data: XOR<ConcertUpdateWithoutBookingLinksInput, ConcertUncheckedUpdateWithoutBookingLinksInput>
  }

  export type ConcertUpdateWithoutBookingLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    kopisId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    venueName?: StringFieldUpdateOperationsInput | string
    venueAddress?: NullableStringFieldUpdateOperationsInput | string | null
    venueMapLink?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ticketStatus?: NullableStringFieldUpdateOperationsInput | string | null
    ticketOpenDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ticketPriceMin?: NullableIntFieldUpdateOperationsInput | number | null
    ticketPriceMax?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    artist?: ArtistUpdateOneWithoutConcertsNestedInput
    setlists?: SetlistUpdateManyWithoutConcertNestedInput
    notifications?: NotificationUpdateManyWithoutConcertNestedInput
  }

  export type ConcertUncheckedUpdateWithoutBookingLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    kopisId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    artistId?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    venueName?: StringFieldUpdateOperationsInput | string
    venueAddress?: NullableStringFieldUpdateOperationsInput | string | null
    venueMapLink?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ticketStatus?: NullableStringFieldUpdateOperationsInput | string | null
    ticketOpenDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ticketPriceMin?: NullableIntFieldUpdateOperationsInput | number | null
    ticketPriceMax?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    setlists?: SetlistUncheckedUpdateManyWithoutConcertNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutConcertNestedInput
  }

  export type UserCreateWithoutFollowedArtistsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    notificationSettings?: NotificationSettingsCreateNestedOneWithoutUserInput
    devices?: UserDeviceCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFollowedArtistsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    notificationSettings?: NotificationSettingsUncheckedCreateNestedOneWithoutUserInput
    devices?: UserDeviceUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFollowedArtistsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFollowedArtistsInput, UserUncheckedCreateWithoutFollowedArtistsInput>
  }

  export type ArtistCreateWithoutFollowersInput = {
    id?: string
    name: string
    image?: string | null
    genre?: string | null
    description?: string | null
    spotifyArtistId?: string | null
    followerCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    concerts?: ConcertCreateNestedManyWithoutArtistInput
    setlists?: SetlistCreateNestedManyWithoutArtistInput
  }

  export type ArtistUncheckedCreateWithoutFollowersInput = {
    id?: string
    name: string
    image?: string | null
    genre?: string | null
    description?: string | null
    spotifyArtistId?: string | null
    followerCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    concerts?: ConcertUncheckedCreateNestedManyWithoutArtistInput
    setlists?: SetlistUncheckedCreateNestedManyWithoutArtistInput
  }

  export type ArtistCreateOrConnectWithoutFollowersInput = {
    where: ArtistWhereUniqueInput
    create: XOR<ArtistCreateWithoutFollowersInput, ArtistUncheckedCreateWithoutFollowersInput>
  }

  export type UserUpsertWithoutFollowedArtistsInput = {
    update: XOR<UserUpdateWithoutFollowedArtistsInput, UserUncheckedUpdateWithoutFollowedArtistsInput>
    create: XOR<UserCreateWithoutFollowedArtistsInput, UserUncheckedCreateWithoutFollowedArtistsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFollowedArtistsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFollowedArtistsInput, UserUncheckedUpdateWithoutFollowedArtistsInput>
  }

  export type UserUpdateWithoutFollowedArtistsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    notificationSettings?: NotificationSettingsUpdateOneWithoutUserNestedInput
    devices?: UserDeviceUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFollowedArtistsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    notificationSettings?: NotificationSettingsUncheckedUpdateOneWithoutUserNestedInput
    devices?: UserDeviceUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ArtistUpsertWithoutFollowersInput = {
    update: XOR<ArtistUpdateWithoutFollowersInput, ArtistUncheckedUpdateWithoutFollowersInput>
    create: XOR<ArtistCreateWithoutFollowersInput, ArtistUncheckedCreateWithoutFollowersInput>
    where?: ArtistWhereInput
  }

  export type ArtistUpdateToOneWithWhereWithoutFollowersInput = {
    where?: ArtistWhereInput
    data: XOR<ArtistUpdateWithoutFollowersInput, ArtistUncheckedUpdateWithoutFollowersInput>
  }

  export type ArtistUpdateWithoutFollowersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    spotifyArtistId?: NullableStringFieldUpdateOperationsInput | string | null
    followerCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    concerts?: ConcertUpdateManyWithoutArtistNestedInput
    setlists?: SetlistUpdateManyWithoutArtistNestedInput
  }

  export type ArtistUncheckedUpdateWithoutFollowersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    spotifyArtistId?: NullableStringFieldUpdateOperationsInput | string | null
    followerCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    concerts?: ConcertUncheckedUpdateManyWithoutArtistNestedInput
    setlists?: SetlistUncheckedUpdateManyWithoutArtistNestedInput
  }

  export type ConcertCreateWithoutSetlistsInput = {
    id?: string
    kopisId?: string | null
    title: string
    poster?: string | null
    date: Date | string
    venueName: string
    venueAddress?: string | null
    venueMapLink?: string | null
    region?: string | null
    genre?: string | null
    description?: string | null
    ticketStatus?: string | null
    ticketOpenDate?: Date | string | null
    ticketPriceMin?: number | null
    ticketPriceMax?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    artist?: ArtistCreateNestedOneWithoutConcertsInput
    bookingLinks?: BookingLinkCreateNestedManyWithoutConcertInput
    notifications?: NotificationCreateNestedManyWithoutConcertInput
  }

  export type ConcertUncheckedCreateWithoutSetlistsInput = {
    id?: string
    kopisId?: string | null
    title: string
    artistId?: string | null
    poster?: string | null
    date: Date | string
    venueName: string
    venueAddress?: string | null
    venueMapLink?: string | null
    region?: string | null
    genre?: string | null
    description?: string | null
    ticketStatus?: string | null
    ticketOpenDate?: Date | string | null
    ticketPriceMin?: number | null
    ticketPriceMax?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookingLinks?: BookingLinkUncheckedCreateNestedManyWithoutConcertInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutConcertInput
  }

  export type ConcertCreateOrConnectWithoutSetlistsInput = {
    where: ConcertWhereUniqueInput
    create: XOR<ConcertCreateWithoutSetlistsInput, ConcertUncheckedCreateWithoutSetlistsInput>
  }

  export type ArtistCreateWithoutSetlistsInput = {
    id?: string
    name: string
    image?: string | null
    genre?: string | null
    description?: string | null
    spotifyArtistId?: string | null
    followerCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    concerts?: ConcertCreateNestedManyWithoutArtistInput
    followers?: UserArtistCreateNestedManyWithoutArtistInput
  }

  export type ArtistUncheckedCreateWithoutSetlistsInput = {
    id?: string
    name: string
    image?: string | null
    genre?: string | null
    description?: string | null
    spotifyArtistId?: string | null
    followerCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    concerts?: ConcertUncheckedCreateNestedManyWithoutArtistInput
    followers?: UserArtistUncheckedCreateNestedManyWithoutArtistInput
  }

  export type ArtistCreateOrConnectWithoutSetlistsInput = {
    where: ArtistWhereUniqueInput
    create: XOR<ArtistCreateWithoutSetlistsInput, ArtistUncheckedCreateWithoutSetlistsInput>
  }

  export type SetlistTrackCreateWithoutSetlistInput = {
    orderNumber: number
    title: string
    spotifyTrackId?: string | null
    duration?: number | null
    createdAt?: Date | string
  }

  export type SetlistTrackUncheckedCreateWithoutSetlistInput = {
    id?: number
    orderNumber: number
    title: string
    spotifyTrackId?: string | null
    duration?: number | null
    createdAt?: Date | string
  }

  export type SetlistTrackCreateOrConnectWithoutSetlistInput = {
    where: SetlistTrackWhereUniqueInput
    create: XOR<SetlistTrackCreateWithoutSetlistInput, SetlistTrackUncheckedCreateWithoutSetlistInput>
  }

  export type SetlistTrackCreateManySetlistInputEnvelope = {
    data: SetlistTrackCreateManySetlistInput | SetlistTrackCreateManySetlistInput[]
    skipDuplicates?: boolean
  }

  export type ConcertUpsertWithoutSetlistsInput = {
    update: XOR<ConcertUpdateWithoutSetlistsInput, ConcertUncheckedUpdateWithoutSetlistsInput>
    create: XOR<ConcertCreateWithoutSetlistsInput, ConcertUncheckedCreateWithoutSetlistsInput>
    where?: ConcertWhereInput
  }

  export type ConcertUpdateToOneWithWhereWithoutSetlistsInput = {
    where?: ConcertWhereInput
    data: XOR<ConcertUpdateWithoutSetlistsInput, ConcertUncheckedUpdateWithoutSetlistsInput>
  }

  export type ConcertUpdateWithoutSetlistsInput = {
    id?: StringFieldUpdateOperationsInput | string
    kopisId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    venueName?: StringFieldUpdateOperationsInput | string
    venueAddress?: NullableStringFieldUpdateOperationsInput | string | null
    venueMapLink?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ticketStatus?: NullableStringFieldUpdateOperationsInput | string | null
    ticketOpenDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ticketPriceMin?: NullableIntFieldUpdateOperationsInput | number | null
    ticketPriceMax?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    artist?: ArtistUpdateOneWithoutConcertsNestedInput
    bookingLinks?: BookingLinkUpdateManyWithoutConcertNestedInput
    notifications?: NotificationUpdateManyWithoutConcertNestedInput
  }

  export type ConcertUncheckedUpdateWithoutSetlistsInput = {
    id?: StringFieldUpdateOperationsInput | string
    kopisId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    artistId?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    venueName?: StringFieldUpdateOperationsInput | string
    venueAddress?: NullableStringFieldUpdateOperationsInput | string | null
    venueMapLink?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ticketStatus?: NullableStringFieldUpdateOperationsInput | string | null
    ticketOpenDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ticketPriceMin?: NullableIntFieldUpdateOperationsInput | number | null
    ticketPriceMax?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingLinks?: BookingLinkUncheckedUpdateManyWithoutConcertNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutConcertNestedInput
  }

  export type ArtistUpsertWithoutSetlistsInput = {
    update: XOR<ArtistUpdateWithoutSetlistsInput, ArtistUncheckedUpdateWithoutSetlistsInput>
    create: XOR<ArtistCreateWithoutSetlistsInput, ArtistUncheckedCreateWithoutSetlistsInput>
    where?: ArtistWhereInput
  }

  export type ArtistUpdateToOneWithWhereWithoutSetlistsInput = {
    where?: ArtistWhereInput
    data: XOR<ArtistUpdateWithoutSetlistsInput, ArtistUncheckedUpdateWithoutSetlistsInput>
  }

  export type ArtistUpdateWithoutSetlistsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    spotifyArtistId?: NullableStringFieldUpdateOperationsInput | string | null
    followerCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    concerts?: ConcertUpdateManyWithoutArtistNestedInput
    followers?: UserArtistUpdateManyWithoutArtistNestedInput
  }

  export type ArtistUncheckedUpdateWithoutSetlistsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    spotifyArtistId?: NullableStringFieldUpdateOperationsInput | string | null
    followerCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    concerts?: ConcertUncheckedUpdateManyWithoutArtistNestedInput
    followers?: UserArtistUncheckedUpdateManyWithoutArtistNestedInput
  }

  export type SetlistTrackUpsertWithWhereUniqueWithoutSetlistInput = {
    where: SetlistTrackWhereUniqueInput
    update: XOR<SetlistTrackUpdateWithoutSetlistInput, SetlistTrackUncheckedUpdateWithoutSetlistInput>
    create: XOR<SetlistTrackCreateWithoutSetlistInput, SetlistTrackUncheckedCreateWithoutSetlistInput>
  }

  export type SetlistTrackUpdateWithWhereUniqueWithoutSetlistInput = {
    where: SetlistTrackWhereUniqueInput
    data: XOR<SetlistTrackUpdateWithoutSetlistInput, SetlistTrackUncheckedUpdateWithoutSetlistInput>
  }

  export type SetlistTrackUpdateManyWithWhereWithoutSetlistInput = {
    where: SetlistTrackScalarWhereInput
    data: XOR<SetlistTrackUpdateManyMutationInput, SetlistTrackUncheckedUpdateManyWithoutSetlistInput>
  }

  export type SetlistTrackScalarWhereInput = {
    AND?: SetlistTrackScalarWhereInput | SetlistTrackScalarWhereInput[]
    OR?: SetlistTrackScalarWhereInput[]
    NOT?: SetlistTrackScalarWhereInput | SetlistTrackScalarWhereInput[]
    id?: IntFilter<"SetlistTrack"> | number
    setlistId?: StringFilter<"SetlistTrack"> | string
    orderNumber?: IntFilter<"SetlistTrack"> | number
    title?: StringFilter<"SetlistTrack"> | string
    spotifyTrackId?: StringNullableFilter<"SetlistTrack"> | string | null
    duration?: IntNullableFilter<"SetlistTrack"> | number | null
    createdAt?: DateTimeFilter<"SetlistTrack"> | Date | string
  }

  export type SetlistCreateWithoutTracksInput = {
    id?: string
    date?: Date | string | null
    venue?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    concert?: ConcertCreateNestedOneWithoutSetlistsInput
    artist?: ArtistCreateNestedOneWithoutSetlistsInput
  }

  export type SetlistUncheckedCreateWithoutTracksInput = {
    id?: string
    concertId?: string | null
    artistId?: string | null
    date?: Date | string | null
    venue?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SetlistCreateOrConnectWithoutTracksInput = {
    where: SetlistWhereUniqueInput
    create: XOR<SetlistCreateWithoutTracksInput, SetlistUncheckedCreateWithoutTracksInput>
  }

  export type SetlistUpsertWithoutTracksInput = {
    update: XOR<SetlistUpdateWithoutTracksInput, SetlistUncheckedUpdateWithoutTracksInput>
    create: XOR<SetlistCreateWithoutTracksInput, SetlistUncheckedCreateWithoutTracksInput>
    where?: SetlistWhereInput
  }

  export type SetlistUpdateToOneWithWhereWithoutTracksInput = {
    where?: SetlistWhereInput
    data: XOR<SetlistUpdateWithoutTracksInput, SetlistUncheckedUpdateWithoutTracksInput>
  }

  export type SetlistUpdateWithoutTracksInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    venue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    concert?: ConcertUpdateOneWithoutSetlistsNestedInput
    artist?: ArtistUpdateOneWithoutSetlistsNestedInput
  }

  export type SetlistUncheckedUpdateWithoutTracksInput = {
    id?: StringFieldUpdateOperationsInput | string
    concertId?: NullableStringFieldUpdateOperationsInput | string | null
    artistId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    venue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutNotificationSettingsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    followedArtists?: UserArtistCreateNestedManyWithoutUserInput
    devices?: UserDeviceCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNotificationSettingsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    followedArtists?: UserArtistUncheckedCreateNestedManyWithoutUserInput
    devices?: UserDeviceUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNotificationSettingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationSettingsInput, UserUncheckedCreateWithoutNotificationSettingsInput>
  }

  export type UserUpsertWithoutNotificationSettingsInput = {
    update: XOR<UserUpdateWithoutNotificationSettingsInput, UserUncheckedUpdateWithoutNotificationSettingsInput>
    create: XOR<UserCreateWithoutNotificationSettingsInput, UserUncheckedCreateWithoutNotificationSettingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationSettingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationSettingsInput, UserUncheckedUpdateWithoutNotificationSettingsInput>
  }

  export type UserUpdateWithoutNotificationSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    followedArtists?: UserArtistUpdateManyWithoutUserNestedInput
    devices?: UserDeviceUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    followedArtists?: UserArtistUncheckedUpdateManyWithoutUserNestedInput
    devices?: UserDeviceUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutDevicesInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    followedArtists?: UserArtistCreateNestedManyWithoutUserInput
    notificationSettings?: NotificationSettingsCreateNestedOneWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDevicesInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    followedArtists?: UserArtistUncheckedCreateNestedManyWithoutUserInput
    notificationSettings?: NotificationSettingsUncheckedCreateNestedOneWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDevicesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDevicesInput, UserUncheckedCreateWithoutDevicesInput>
  }

  export type UserUpsertWithoutDevicesInput = {
    update: XOR<UserUpdateWithoutDevicesInput, UserUncheckedUpdateWithoutDevicesInput>
    create: XOR<UserCreateWithoutDevicesInput, UserUncheckedCreateWithoutDevicesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDevicesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDevicesInput, UserUncheckedUpdateWithoutDevicesInput>
  }

  export type UserUpdateWithoutDevicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    followedArtists?: UserArtistUpdateManyWithoutUserNestedInput
    notificationSettings?: NotificationSettingsUpdateOneWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDevicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    followedArtists?: UserArtistUncheckedUpdateManyWithoutUserNestedInput
    notificationSettings?: NotificationSettingsUncheckedUpdateOneWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutNotificationsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    followedArtists?: UserArtistCreateNestedManyWithoutUserInput
    notificationSettings?: NotificationSettingsCreateNestedOneWithoutUserInput
    devices?: UserDeviceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    followedArtists?: UserArtistUncheckedCreateNestedManyWithoutUserInput
    notificationSettings?: NotificationSettingsUncheckedCreateNestedOneWithoutUserInput
    devices?: UserDeviceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type ConcertCreateWithoutNotificationsInput = {
    id?: string
    kopisId?: string | null
    title: string
    poster?: string | null
    date: Date | string
    venueName: string
    venueAddress?: string | null
    venueMapLink?: string | null
    region?: string | null
    genre?: string | null
    description?: string | null
    ticketStatus?: string | null
    ticketOpenDate?: Date | string | null
    ticketPriceMin?: number | null
    ticketPriceMax?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    artist?: ArtistCreateNestedOneWithoutConcertsInput
    bookingLinks?: BookingLinkCreateNestedManyWithoutConcertInput
    setlists?: SetlistCreateNestedManyWithoutConcertInput
  }

  export type ConcertUncheckedCreateWithoutNotificationsInput = {
    id?: string
    kopisId?: string | null
    title: string
    artistId?: string | null
    poster?: string | null
    date: Date | string
    venueName: string
    venueAddress?: string | null
    venueMapLink?: string | null
    region?: string | null
    genre?: string | null
    description?: string | null
    ticketStatus?: string | null
    ticketOpenDate?: Date | string | null
    ticketPriceMin?: number | null
    ticketPriceMax?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookingLinks?: BookingLinkUncheckedCreateNestedManyWithoutConcertInput
    setlists?: SetlistUncheckedCreateNestedManyWithoutConcertInput
  }

  export type ConcertCreateOrConnectWithoutNotificationsInput = {
    where: ConcertWhereUniqueInput
    create: XOR<ConcertCreateWithoutNotificationsInput, ConcertUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    followedArtists?: UserArtistUpdateManyWithoutUserNestedInput
    notificationSettings?: NotificationSettingsUpdateOneWithoutUserNestedInput
    devices?: UserDeviceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    followedArtists?: UserArtistUncheckedUpdateManyWithoutUserNestedInput
    notificationSettings?: NotificationSettingsUncheckedUpdateOneWithoutUserNestedInput
    devices?: UserDeviceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ConcertUpsertWithoutNotificationsInput = {
    update: XOR<ConcertUpdateWithoutNotificationsInput, ConcertUncheckedUpdateWithoutNotificationsInput>
    create: XOR<ConcertCreateWithoutNotificationsInput, ConcertUncheckedCreateWithoutNotificationsInput>
    where?: ConcertWhereInput
  }

  export type ConcertUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: ConcertWhereInput
    data: XOR<ConcertUpdateWithoutNotificationsInput, ConcertUncheckedUpdateWithoutNotificationsInput>
  }

  export type ConcertUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    kopisId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    venueName?: StringFieldUpdateOperationsInput | string
    venueAddress?: NullableStringFieldUpdateOperationsInput | string | null
    venueMapLink?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ticketStatus?: NullableStringFieldUpdateOperationsInput | string | null
    ticketOpenDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ticketPriceMin?: NullableIntFieldUpdateOperationsInput | number | null
    ticketPriceMax?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    artist?: ArtistUpdateOneWithoutConcertsNestedInput
    bookingLinks?: BookingLinkUpdateManyWithoutConcertNestedInput
    setlists?: SetlistUpdateManyWithoutConcertNestedInput
  }

  export type ConcertUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    kopisId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    artistId?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    venueName?: StringFieldUpdateOperationsInput | string
    venueAddress?: NullableStringFieldUpdateOperationsInput | string | null
    venueMapLink?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ticketStatus?: NullableStringFieldUpdateOperationsInput | string | null
    ticketOpenDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ticketPriceMin?: NullableIntFieldUpdateOperationsInput | number | null
    ticketPriceMax?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingLinks?: BookingLinkUncheckedUpdateManyWithoutConcertNestedInput
    setlists?: SetlistUncheckedUpdateManyWithoutConcertNestedInput
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserArtistCreateManyUserInput = {
    id?: number
    artistId: string
    createdAt?: Date | string
  }

  export type UserDeviceCreateManyUserInput = {
    id?: number
    fcmToken: string
    platform: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationCreateManyUserInput = {
    id?: number
    type: string
    title: string
    body: string
    concertId?: string | null
    readAt?: Date | string | null
    sentAt?: Date | string
    createdAt?: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserArtistUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    artist?: ArtistUpdateOneRequiredWithoutFollowersNestedInput
  }

  export type UserArtistUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    artistId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserArtistUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    artistId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDeviceUpdateWithoutUserInput = {
    fcmToken?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDeviceUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    fcmToken?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDeviceUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    fcmToken?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    concert?: ConcertUpdateOneWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    concertId?: NullableStringFieldUpdateOperationsInput | string | null
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    concertId?: NullableStringFieldUpdateOperationsInput | string | null
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConcertCreateManyArtistInput = {
    id?: string
    kopisId?: string | null
    title: string
    poster?: string | null
    date: Date | string
    venueName: string
    venueAddress?: string | null
    venueMapLink?: string | null
    region?: string | null
    genre?: string | null
    description?: string | null
    ticketStatus?: string | null
    ticketOpenDate?: Date | string | null
    ticketPriceMin?: number | null
    ticketPriceMax?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserArtistCreateManyArtistInput = {
    id?: number
    userId: string
    createdAt?: Date | string
  }

  export type SetlistCreateManyArtistInput = {
    id?: string
    concertId?: string | null
    date?: Date | string | null
    venue?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConcertUpdateWithoutArtistInput = {
    id?: StringFieldUpdateOperationsInput | string
    kopisId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    venueName?: StringFieldUpdateOperationsInput | string
    venueAddress?: NullableStringFieldUpdateOperationsInput | string | null
    venueMapLink?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ticketStatus?: NullableStringFieldUpdateOperationsInput | string | null
    ticketOpenDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ticketPriceMin?: NullableIntFieldUpdateOperationsInput | number | null
    ticketPriceMax?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingLinks?: BookingLinkUpdateManyWithoutConcertNestedInput
    setlists?: SetlistUpdateManyWithoutConcertNestedInput
    notifications?: NotificationUpdateManyWithoutConcertNestedInput
  }

  export type ConcertUncheckedUpdateWithoutArtistInput = {
    id?: StringFieldUpdateOperationsInput | string
    kopisId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    venueName?: StringFieldUpdateOperationsInput | string
    venueAddress?: NullableStringFieldUpdateOperationsInput | string | null
    venueMapLink?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ticketStatus?: NullableStringFieldUpdateOperationsInput | string | null
    ticketOpenDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ticketPriceMin?: NullableIntFieldUpdateOperationsInput | number | null
    ticketPriceMax?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookingLinks?: BookingLinkUncheckedUpdateManyWithoutConcertNestedInput
    setlists?: SetlistUncheckedUpdateManyWithoutConcertNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutConcertNestedInput
  }

  export type ConcertUncheckedUpdateManyWithoutArtistInput = {
    id?: StringFieldUpdateOperationsInput | string
    kopisId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    venueName?: StringFieldUpdateOperationsInput | string
    venueAddress?: NullableStringFieldUpdateOperationsInput | string | null
    venueMapLink?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    genre?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ticketStatus?: NullableStringFieldUpdateOperationsInput | string | null
    ticketOpenDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ticketPriceMin?: NullableIntFieldUpdateOperationsInput | number | null
    ticketPriceMax?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserArtistUpdateWithoutArtistInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFollowedArtistsNestedInput
  }

  export type UserArtistUncheckedUpdateWithoutArtistInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserArtistUncheckedUpdateManyWithoutArtistInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SetlistUpdateWithoutArtistInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    venue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    concert?: ConcertUpdateOneWithoutSetlistsNestedInput
    tracks?: SetlistTrackUpdateManyWithoutSetlistNestedInput
  }

  export type SetlistUncheckedUpdateWithoutArtistInput = {
    id?: StringFieldUpdateOperationsInput | string
    concertId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    venue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tracks?: SetlistTrackUncheckedUpdateManyWithoutSetlistNestedInput
  }

  export type SetlistUncheckedUpdateManyWithoutArtistInput = {
    id?: StringFieldUpdateOperationsInput | string
    concertId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    venue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingLinkCreateManyConcertInput = {
    id?: number
    platform: string
    url: string
    createdAt?: Date | string
  }

  export type SetlistCreateManyConcertInput = {
    id?: string
    artistId?: string | null
    date?: Date | string | null
    venue?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationCreateManyConcertInput = {
    id?: number
    userId: string
    type: string
    title: string
    body: string
    readAt?: Date | string | null
    sentAt?: Date | string
    createdAt?: Date | string
  }

  export type BookingLinkUpdateWithoutConcertInput = {
    platform?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingLinkUncheckedUpdateWithoutConcertInput = {
    id?: IntFieldUpdateOperationsInput | number
    platform?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingLinkUncheckedUpdateManyWithoutConcertInput = {
    id?: IntFieldUpdateOperationsInput | number
    platform?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SetlistUpdateWithoutConcertInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    venue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    artist?: ArtistUpdateOneWithoutSetlistsNestedInput
    tracks?: SetlistTrackUpdateManyWithoutSetlistNestedInput
  }

  export type SetlistUncheckedUpdateWithoutConcertInput = {
    id?: StringFieldUpdateOperationsInput | string
    artistId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    venue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tracks?: SetlistTrackUncheckedUpdateManyWithoutSetlistNestedInput
  }

  export type SetlistUncheckedUpdateManyWithoutConcertInput = {
    id?: StringFieldUpdateOperationsInput | string
    artistId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    venue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutConcertInput = {
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateWithoutConcertInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutConcertInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SetlistTrackCreateManySetlistInput = {
    id?: number
    orderNumber: number
    title: string
    spotifyTrackId?: string | null
    duration?: number | null
    createdAt?: Date | string
  }

  export type SetlistTrackUpdateWithoutSetlistInput = {
    orderNumber?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    spotifyTrackId?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SetlistTrackUncheckedUpdateWithoutSetlistInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderNumber?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    spotifyTrackId?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SetlistTrackUncheckedUpdateManyWithoutSetlistInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderNumber?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    spotifyTrackId?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}