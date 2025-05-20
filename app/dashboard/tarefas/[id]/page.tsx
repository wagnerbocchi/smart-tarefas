"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import Link from "next/link"

interface Task {
  id: string
  title: string
  responsavel: string
  classificacao: string
  prioridade: string
  status: string
  dataInicio: string
  dataFim: string
  horaInicio?: string
  horaFim?: string
  empresa: string
  demandante: string
  canalAtendimento: string
  referencia: string
  catalogo: string
  observacoes: string
}

export default function TarefaDetalhesPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [task, setTask] = useState<Task | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Simulação de carregamento de dados da tarefa
    const fetchTask = async () => {
      setIsLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Dados simulados para a tarefa
        const mockTask: Task = {
          id: params.id,
          title: "Atualizar documentação do sistema",
          responsavel: "João Silva",
          classificacao: "Documentação",
          prioridade: "alta",
          status: "pendente",
          dataInicio: "2025-05-20",
          dataFim: "2025-05-22",
          horaInicio: "09:00",
          horaFim: "17:00",
          empresa: "TechCorp",
          demandante: "Departamento de TI",
          canalAtendimento: "email",
          referencia: "DOC-2023-001",
          catalogo: "Documentação Técnica",
          observacoes: "Incluir novos módulos desenvolvidos",
        }

        setTask(mockTask)
      } catch (error) {
        console.error("Erro ao carregar tarefa:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTask()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulação de atualização de dados
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirecionar para a lista de tarefas
      router.push("/dashboard/tarefas")
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    try {
      // Simulação de exclusão de dados
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirecionar para a lista de tarefas
      router.push("/dashboard/tarefas")
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Carregando...</p>
      </div>
    )
  }

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p>Tarefa não encontrada</p>
        <Link href="/dashboard/tarefas">
          <Button>Voltar para a lista</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/tarefas">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Detalhes da Tarefa</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Editar Tarefa</CardTitle>
          <CardDescription>Visualize e edite os detalhes da tarefa</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={task.title}
                  onChange={(e) => setTask({ ...task, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="responsavel">Responsável</Label>
                <Input
                  id="responsavel"
                  value={task.responsavel}
                  onChange={(e) => setTask({ ...task, responsavel: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="classificacao">Classificação</Label>
                <Input
                  id="classificacao"
                  value={task.classificacao}
                  onChange={(e) => setTask({ ...task, classificacao: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prioridade">Prioridade</Label>
                <Select value={task.prioridade} onValueChange={(value) => setTask({ ...task, prioridade: value })}>
                  <SelectTrigger id="prioridade">
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixa">Baixa</SelectItem>
                    <SelectItem value="media">Média</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataInicio">Data de Início</Label>
                <Input
                  id="dataInicio"
                  type="date"
                  value={task.dataInicio}
                  onChange={(e) => setTask({ ...task, dataInicio: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataFim">Data de Término</Label>
                <Input
                  id="dataFim"
                  type="date"
                  value={task.dataFim}
                  onChange={(e) => setTask({ ...task, dataFim: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="horaInicio">Hora de Início</Label>
                <Input
                  id="horaInicio"
                  type="time"
                  value={task.horaInicio}
                  onChange={(e) => setTask({ ...task, horaInicio: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="horaFim">Hora de Término</Label>
                <Input
                  id="horaFim"
                  type="time"
                  value={task.horaFim}
                  onChange={(e) => setTask({ ...task, horaFim: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="empresa">Empresa</Label>
                <Input
                  id="empresa"
                  value={task.empresa}
                  onChange={(e) => setTask({ ...task, empresa: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demandante">Demandante</Label>
                <Input
                  id="demandante"
                  value={task.demandante}
                  onChange={(e) => setTask({ ...task, demandante: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="canalAtendimento">Canal de Atendimento</Label>
                <Select
                  value={task.canalAtendimento}
                  onValueChange={(value) => setTask({ ...task, canalAtendimento: value })}
                >
                  <SelectTrigger id="canalAtendimento">
                    <SelectValue placeholder="Selecione o canal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="telefone">Telefone</SelectItem>
                    <SelectItem value="presencial">Presencial</SelectItem>
                    <SelectItem value="chat">Chat</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="referencia">Referência de Ticket</Label>
                <Input
                  id="referencia"
                  value={task.referencia}
                  onChange={(e) => setTask({ ...task, referencia: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="catalogo">Catálogo</Label>
                <Input
                  id="catalogo"
                  value={task.catalogo}
                  onChange={(e) => setTask({ ...task, catalogo: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={task.status} onValueChange={(value) => setTask({ ...task, status: value })}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="em_andamento">Em Andamento</SelectItem>
                    <SelectItem value="concluida">Concluída</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                placeholder="Detalhes adicionais sobre a tarefa..."
                className="min-h-[100px]"
                value={task.observacoes}
                onChange={(e) => setTask({ ...task, observacoes: e.target.value })}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" type="button">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Excluir
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação não pode ser desfeita. Isso excluirá permanentemente esta tarefa.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                "Salvando..."
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Alterações
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
