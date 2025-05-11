import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  ClipboardList, 
  TrendingUp, 
  ChevronRight,
  School,
  BookText,
  BookMarked,
  UsersRound,
  LineChart,
  PersonStanding,
  Trophy,
  CalendarDays,
  LibraryBig
} from "lucide-react"
import { sql } from "@/lib/db"
import Link from "next/link"

async function getStats() {
  const studentCount = await sql`SELECT COUNT(*) as count FROM students`
  const facultyCount = await sql`SELECT COUNT(*) as count FROM faculty`
  const subjectCount = await sql`SELECT COUNT(*) as count FROM subjects`
  const classCount = await sql`SELECT COUNT(*) as count FROM classes`

  return {
    studentCount: studentCount[0].count,
    facultyCount: facultyCount[0].count,
    subjectCount: subjectCount[0].count,
    classCount: classCount[0].count,
  }
}

export default async function Home() {
  const stats = await getStats()

  return (
    <div className="animate-in space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="gradient-heading text-3xl font-bold tracking-tight">ISE Department Dashboard</h1>
          <p className="mt-1 text-muted-foreground">Welcome to the Information Science & Engineering Department System</p>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <Button variant="outline" size="sm" className="gap-1">
            <CalendarDays className="h-4 w-4" /> {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </Button>
          <Button size="sm" className="gap-1">
            <TrendingUp className="h-4 w-4" /> View Reports
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-card-effect">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <div className="rounded-full bg-primary/10 p-1">
              <School className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.studentCount}</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500">+12%</span>
              <span className="ml-1">since last semester</span>
            </div>
          </CardContent>
          <CardFooter className="p-0">
            <Link href="/students" className="flex w-full items-center justify-between rounded-b-lg bg-muted/50 p-3 text-xs font-medium hover:bg-muted">
              View all students
              <ChevronRight className="h-3 w-3" />
            </Link>
          </CardFooter>
        </Card>

        <Card className="hover-card-effect">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faculty</CardTitle>
            <div className="rounded-full bg-blue-500/10 p-1">
              <UsersRound className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.facultyCount}</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <PersonStanding className="mr-1 h-3 w-3 text-blue-500" />
              <span>Faculty-student ratio: 1:{Math.round(stats.studentCount / stats.facultyCount)}</span>
            </div>
          </CardContent>
          <CardFooter className="p-0">
            <Link href="/faculty" className="flex w-full items-center justify-between rounded-b-lg bg-muted/50 p-3 text-xs font-medium hover:bg-muted">
              View all faculty
              <ChevronRight className="h-3 w-3" />
            </Link>
          </CardFooter>
        </Card>

        <Card className="hover-card-effect">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subjects</CardTitle>
            <div className="rounded-full bg-amber-500/10 p-1">
              <BookMarked className="h-4 w-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.subjectCount}</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <BookText className="mr-1 h-3 w-3 text-amber-500" />
              <span>Across all semesters</span>
            </div>
          </CardContent>
          <CardFooter className="p-0">
            <Link href="/subjects" className="flex w-full items-center justify-between rounded-b-lg bg-muted/50 p-3 text-xs font-medium hover:bg-muted">
              View all subjects
              <ChevronRight className="h-3 w-3" />
            </Link>
          </CardFooter>
        </Card>

        <Card className="hover-card-effect">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes</CardTitle>
            <div className="rounded-full bg-purple-500/10 p-1">
              <LibraryBig className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.classCount}</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <Trophy className="mr-1 h-3 w-3 text-purple-500" />
              <span>Active this semester</span>
            </div>
          </CardContent>
          <CardFooter className="p-0">
            <Link href="/classes" className="flex w-full items-center justify-between rounded-b-lg bg-muted/50 p-3 text-xs font-medium hover:bg-muted">
              View all classes
              <ChevronRight className="h-3 w-3" />
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover-card-effect md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates in the department</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-start gap-4 rounded-lg border p-4">
              <div className="rounded-full bg-blue-500/10 p-2">
                <PersonStanding className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium">New Faculty Member</h3>
                <p className="text-sm text-muted-foreground">Dr. Neha Patel joined the department</p>
                <p className="mt-1 text-xs text-muted-foreground">Today at 10:30 AM</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg border p-4">
              <div className="rounded-full bg-green-500/10 p-2">
                <LineChart className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-medium">Marks Updated</h3>
                <p className="text-sm text-muted-foreground">Semester marks have been updated for 3rd year students</p>
                <p className="mt-1 text-xs text-muted-foreground">Yesterday at 4:15 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg border p-4">
              <div className="rounded-full bg-amber-500/10 p-2">
                <BookMarked className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h3 className="font-medium">New Subject Added</h3>
                <p className="text-sm text-muted-foreground">Blockchain Technology has been added to the curriculum</p>
                <p className="mt-1 text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <Button variant="outline" className="w-full">
              View All Activities
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover-card-effect">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild variant="outline" className="w-full justify-start gap-2">
              <Link href="/students?action=add">
                <School className="h-4 w-4" /> Add New Student
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start gap-2">
              <Link href="/faculty?action=add">
                <UsersRound className="h-4 w-4" /> Add New Faculty
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start gap-2">
              <Link href="/assignments?action=add">
                <BookText className="h-4 w-4" /> Assign Subject to Faculty
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start gap-2">
              <Link href="/marks?action=add">
                <LineChart className="h-4 w-4" /> Enter Student Marks
              </Link>
            </Button>
          </CardContent>
          <CardFooter className="border-t p-4">
            <Button className="w-full gap-1">
              <TrendingUp className="h-4 w-4" /> Generate Reports
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
