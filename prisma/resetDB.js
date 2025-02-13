require('dotenv').config()
const prisma = require('../models')

async function resetDatabase() {
  
  // Delete data from all tables
  await prisma.$transaction([
    prisma.user.deleteMany(),
    prisma.post.deleteMany(),
    prisma.comment.deleteMany(),
    prisma.like.deleteMany(),
    prisma.relationship.deleteMany()
    // Add other model deletions
  ])
}

console.log('Reset DB...')
resetDatabase()