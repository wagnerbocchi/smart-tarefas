"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { PlusCircle, Search, AlertCircle, Clock, CheckCircle2 } from "lucide-react"

interface Task {
  id: string
  title: string
  responsavel: string
  classificacao: string
  prioridade: "baixa" | "media" | "alta"
  status: "pendente" | "em_andamento" | "concluida"
  dataInicio: string
  dataFim: string
  empresa: string
  demandante: string
  canalAtendimento: string
  referencia: string
  catalogo: string
  observacoes: string
}

export default function TarefasPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")

  useEffect(() => {
    // Simulação de dados de tarefas
    const mockTasks: Task[] = [
      {
        id: "1",
        title: "Atualizar documentação do sistema",
        responsavel: "João Silva",
        classificacao: "Documentação",
        prioridade: "alta",
        status: "pendente",
        dataInicio: "2025-05-20",
        dataFim: "2025-05-22",
        empresa: "TechCorp",
        demandante: "Departamento de TI",
        canalAtendimento: "Email",
        referencia: "DOC-2023-001",
        catalogo: "Documentação Técnica",
        observacoes: "Incluir novos módulos desenvolvidos",
      },
      {
        id: "2",
        title: "Reunião com equipe de desenvolvimento",
        responsavel: "Maria Oliveira",
        classificacao: "Reunião",
        prioridade: "media",
        status: "em_andamento",
        dataInicio: "2025-05-21",
        dataFim: "2025-05-21",
        empresa: "TechCorp",
        demandante: "Gerência de Projetos",
        canalAtendimento: "Presencial",
        referencia: "MEET-2023-042",
        catalogo: "Reuniões Internas",
        observacoes: "Discutir cronograma do próximo sprint",
      },
      {
        id: "3",
        title: "Responder emails pendentes",
        responsavel: "Carlos Mendes",
        classificacao: "Comunicação",
        prioridade: "baixa",
        status: "concluida",
        dataInicio: "2025-05-19",
        dataFim: "2025-05-20",
        empresa: "TechCorp",
        demandante: "Diversos",
        canalAtendimento: "Email",
        referencia: "EMAIL-2023-123",
        catalogo: "Comunicação Interna",
        observacoes: "Priorizar emails de clientes",
      },
    ]

    setTasks(mockTasks)
    setFilteredTasks(mockTasks)
  }, [])

  useEffect(() => {
    let result = tasks

    // Aplicar filtro de status
    if (statusFilter !== "todos") {
      result = result.filter((task) => task.status === statusFilter)
    }

    // Aplicar filtro de busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(term) ||
          task.responsavel.toLowerCase().includes(term) ||
          task.empresa.toLowerCase().includes(term) ||
          task.demandante.toLowerCase().includes(term),
      )
    }

    setFilteredTasks(result)
  }, [searchTerm, statusFilter, tasks])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pendente":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "em_andamento":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "concluida":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pendente":
        return "Pendente"
      case "em_andamento":
        return "Em Andamento"
      case "concluida":
        return "Concluída"
      default:
        return status
    }
  }

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "baixa":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "media":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "alta":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return ""
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "baixa":
        return "Baixa"
      case "media":
        return "Média"
      case "alta":
        return "Alta"
      default:
        return priority
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Minhas Tarefas</h1>
          <p className="text-muted-foreground">Gerencie e acompanhe suas tarefas</p>
        </div>
        <Link href="/dashboard/tarefas/nova">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Tarefa
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Tarefas</CardTitle>
          <CardDescription>Visualize e gerencie todas as suas tarefas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar tarefas..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="concluida">Concluída</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Data Início</TableHead>
                  <TableHead>Data Fim</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead className="hidden md:table-cell">Demandante</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <div className="flex items-center">
                          {getStatusIcon(task.status)}
                          <span className="ml-2 hidden md:inline">{getStatusText(task.status)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <Link href={`/dashboard/tarefas/${task.id}`} className="hover:underline">
                          {task.title}
                        </Link>
                      </TableCell>
                      <TableCell>{task.responsavel}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityClass(
                            task.prioridade,
                          )}`}
                        >
                          {getPriorityText(task.prioridade)}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(task.dataInicio).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell>{new Date(task.dataFim).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell>{task.empresa}</TableCell>
                      <TableCell className="hidden md:table-cell">{task.demandante}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Nenhuma tarefa encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
