"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save } from "lucide-react"

export default function ConfiguracoesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    browser: true,
    tarefasCriadas: true,
    tarefasAtualizadas: true,
    lembretes: true,
  })
  const [displaySettings, setDisplaySettings] = useState({
    darkMode: false,
    compactMode: false,
    highContrast: false,
  })

  const handleNotificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulação de atualização de configurações
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Configurações de notificação atualizadas com sucesso!")
    } catch (error) {
      console.error("Erro ao atualizar configurações:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDisplaySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulação de atualização de configurações
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Configurações de exibição atualizadas com sucesso!")
    } catch (error) {
      console.error("Erro ao atualizar configurações:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Gerencie suas preferências de notificação e exibição</p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="display">Exibição</TabsTrigger>
        </TabsList>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificação</CardTitle>
              <CardDescription>Escolha como deseja receber notificações</CardDescription>
            </CardHeader>
            <form onSubmit={handleNotificationSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Canais de Notificação</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email</Label>
                      <p className="text-sm text-muted-foreground">Receba notificações por email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notificationSettings.email}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          email: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="browser-notifications">Navegador</Label>
                      <p className="text-sm text-muted-foreground">Receba notificações no navegador</p>
                    </div>
                    <Switch
                      id="browser-notifications"
                      checked={notificationSettings.browser}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          browser: checked,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Tipos de Notificação</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="tarefas-criadas">Tarefas Criadas</Label>
                      <p className="text-sm text-muted-foreground">Notificações quando novas tarefas forem criadas</p>
                    </div>
                    <Switch
                      id="tarefas-criadas"
                      checked={notificationSettings.tarefasCriadas}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          tarefasCriadas: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="tarefas-atualizadas">Tarefas Atualizadas</Label>
                      <p className="text-sm text-muted-foreground">Notificações quando tarefas forem atualizadas</p>
                    </div>
                    <Switch
                      id="tarefas-atualizadas"
                      checked={notificationSettings.tarefasAtualizadas}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          tarefasAtualizadas: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="lembretes">Lembretes</Label>
                      <p className="text-sm text-muted-foreground">
                        Receba lembretes de tarefas próximas do vencimento
                      </p>
                    </div>
                    <Switch
                      id="lembretes"
                      checked={notificationSettings.lembretes}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          lembretes: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Salvando..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Configurações
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="display" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Exibição</CardTitle>
              <CardDescription>Personalize a aparência do sistema</CardDescription>
            </CardHeader>
            <form onSubmit={handleDisplaySubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Modo Escuro</Label>
                      <p className="text-sm text-muted-foreground">Ativar tema escuro para o sistema</p>
                    </div>
                    <Switch
                      id="dark-mode"
                      checked={displaySettings.darkMode}
                      onCheckedChange={(checked) =>
                        setDisplaySettings({
                          ...displaySettings,
                          darkMode: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="compact-mode">Modo Compacto</Label>
                      <p className="text-sm text-muted-foreground">Reduzir espaçamento entre elementos</p>
                    </div>
                    <Switch
                      id="compact-mode"
                      checked={displaySettings.compactMode}
                      onCheckedChange={(checked) =>
                        setDisplaySettings({
                          ...displaySettings,
                          compactMode: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="high-contrast">Alto Contraste</Label>
                      <p className="text-sm text-muted-foreground">Aumentar o contraste para melhor visibilidade</p>
                    </div>
                    <Switch
                      id="high-contrast"
                      checked={displaySettings.highContrast}
                      onCheckedChange={(checked) =>
                        setDisplaySettings({
                          ...displaySettings,
                          highContrast: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Salvando..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Configurações
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
