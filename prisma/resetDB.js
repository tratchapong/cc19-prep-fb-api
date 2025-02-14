require('dotenv').config()
const prisma = require('../models')

// beware order of table to delete
async function resetDatabase() {
  try {
    // await prisma.$transaction([
    //   prisma.comment.deleteMany(),
    //   prisma.like.deleteMany(),
    //   prisma.post.deleteMany(),
    //   prisma.relationship.deleteMany(),
    //   prisma.user.deleteMany(),
    // ])
  
    // reset auto_increment to 1 for User table
    const tableNames = Object.keys(prisma)
    .filter(key => !key.startsWith('$') && !key.startsWith('_'))
  
    console.log(tableNames)
  
    for (let tableName of tableNames) {
      console.log(`Resetting data & auto_increment for table: ${tableName}`)
      await prisma[tableName].deleteMany()
      await prisma.$executeRawUnsafe(`ALTER TABLE \`${tableName}\` AUTO_INCREMENT = 1`)
    }
  }catch(err) {
    console.log('***ERROR***')
    console.log(err)
  }
}

console.log('Reset DB...')
resetDatabase()