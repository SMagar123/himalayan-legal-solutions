import { db } from "../lib/db"
import { users } from "../lib/db/schema"
import bcrypt from "bcrypt"

async function seedAdmin() {
  const email = "admin@himalayanlegal.com"
  const password = "AdminPassword123!" // Change this immediately after first login

  console.log("🔍 Checking if admin exists...")

  const existingUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  })

  if (existingUser) {
    console.log(`✅ Admin already exists: ${email}`)
    process.exit(0)
  }

  console.log("🔐 Hashing password...")
  const passwordHash = await bcrypt.hash(password, 10)

  console.log("📝 Creating admin user...")
  await db.insert(users).values({
    name: "Super Admin",
    email: email,
    passwordHash: passwordHash,
    role: "admin",
  })

  console.log(`🎉 Admin created successfully!`)
  console.log(`   Email: ${email}`)
  console.log(`   Password: ${password}`)
  console.log(`   ⚠️  Please change this password immediately after login.`)

  process.exit(0)
}

seedAdmin().catch((err) => {
  console.error("❌ Failed to seed admin:", err)
  process.exit(1)
})
