"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"

interface Task {
  id: string
  title: string
  priority: "baixa" | "media" | "alta"
  status: "pendente" | "em_andamento" | "concluida"
  dueDate: string
}

export default function Dashboard() {
  const [user, setUser] = useState<{ name?: string; email: string } | null>(null)
  const [recentTasks, setRecentTasks] = useState<Task[]>([])
  const [stats, setStats] = useState({
    total: 0,
    pendentes: 0,
    emAndamento: 0,
    concluidas: 0,
  })

  useEffect(() => {
    // Carregar dados do usuário do localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Simulação de dados de tarefas
    const mockTasks: Task[] = [
      {
        id: "1",
        title: "Atualizar documentação do sistema",
        priority: "alta",
        status: "pendente",
        dueDate: "2025-05-22",
      },
      {
        id: "2",
        title: "Reunião com equipe de desenvolvimento",
        priority: "media",
        status: "em_andamento",
        dueDate: "2025-05-21",
      },
      {
        id: "3",
        title: "Responder emails pendentes",
        priority: "baixa",
        status: "concluida",
        dueDate: "2025-05-20",
      },
    ]

    setRecentTasks(mockTasks)

    // Calcular estatísticas
    setStats({
      total: mockTasks.length,
      pendentes: mockTasks.filter((t) => t.status === "pendente").length,
      emAndamento: mockTasks.filter((t) => t.status === "em_andamento").length,
      concluidas: mockTasks.filter((t) => t.status === "concluida").length,
    })
  }, [])

  if (!user) {
    return <div>Carregando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bem-vindo, {user.name || user.email}</h1>
          <p className="text-muted-foreground">Aqui está um resumo das suas tarefas</p>
        </div>
        <Link href="/dashboard/tarefas/nova">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Tarefa
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Tarefas</CardTitle>
            <div className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendentes}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.emAndamento}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.concluidas}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Tarefas Recentes</CardTitle>
          <CardDescription>Suas tarefas mais recentes estão listadas abaixo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    {task.status === "pendente" && <AlertCircle className="h-5 w-5 text-amber-500" />}
                    {task.status === "em_andamento" && <Clock className="h-5 w-5 text-blue-500" />}
                    {task.status === "concluida" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Vencimento: {new Date(task.dueDate).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        task.priority === "baixa"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : task.priority === "media"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {task.priority === "baixa" ? "Baixa" : task.priority === "media" ? "Média" : "Alta"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">Nenhuma tarefa encontrada</p>
                <Link href="/dashboard/tarefas/nova">
                  <Button variant="link" className="mt-2">
                    Criar nova tarefa
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
