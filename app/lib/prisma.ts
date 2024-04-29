import {PrismaClient} from "@prisma/client";

let prisma: PrismaClient;

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// シングルトンインスタンスのチェックと割り当て
// globalForPrisma.prisma が未定義の場合、新しい PrismaClient インスタンスを作成して globalForPrisma.prisma に割り当てます。
// これにより、以降のリクエストやホットリロードで同じインスタンスが再利用されます。そして、このインスタンスを prisma 変数に割り当てます。
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient();
}
prisma = globalForPrisma.prisma;

export default prisma;
