Feature: Notificador de atualização e convites

    As a Usurário
    I want to Ver suas notificações
    So that pode-se ver uma lista de notificações

Scenario: Visualizar notificações
    Given O usuário “Lucas” está logado
    When “Lucas” clica na janela de “Notificações”
    Then Aparece uma lista de notificações referentes a “Lucas”

Scenario: Visualizar notificação de convite
    Given O usuário “Lucas” está logado como Aluno
    And “Lucas” foi convidado para uma turma pelo professor “Marcio”
    When “Lucas” clica na janela de “Notificações”
    Then uma notificação do convite da turma vindo do professor “Marcio” aparece na tela


Scenario: Clicar em uma notificação de convite
    Given O usuário “Lucas” está logado como Aluno
    And “Lucas” está na janela de “Notificações”
    And Existe a notificação de um convite para a turma “ess 2017.2”
    When “Lucas” clica na notificação do convite para a turma
    Then A página é redirecionada para a página da turma “ess 2017.2”


Scenario: Visualização de notificação de convite enviado
    Given O usuário “Marcio” está logado como Professor
    And “Marcio” enviou um convite para um aluno de email “lucas@cin.ufpe.br” para a turma “ess 2017.2”
    When “Marcio” vai para aba de “Notificações”
    Then Consegue visualizar uma notificação que o convite para o aluno de email “lucas@cin.ufpe.br” foi enviado


Scenario: Visualização de convite aceito
    Given O usuário “Marcio” está logado como Professor
    And “Marcio” enviou um convite para um aluno de email “lucas@cin.ufpe.br” para a turma “ess 2017.2”
    When “Marcio” vai para aba de “Notificações”
    Then Consegue visualizar uma notificação que o aluno de email “lucas@cin.ufpe.br” aceitou o convite

Scenario: Visualização de convite rejeitado
    Given O usuário “Marcio” está logado como Professor
    And “Marcio” enviou um convite para um aluno de email “lucas@cin.ufpe.br” para a turma “ess 2017.2”
    When “Marcio” vai para aba de “Notificações”
    Then Consegue visualizar uma notificação que o aluno de email “lucas@cin.ufpe.br” rejeitado o convite

Scenario: Clicar em uma notificação de resposta de convite
    Given O usuário “Marcio” está logado como Professor
    And “Marcio” está na janela de “Notificações”
    And Existe a notificação de aceitação ou rejeição de convite para a turma “ess 2017.2”
    When “Marcio” clica na notificação da resposta do convite
    Then A página é redirecionada para a página da turma “ess 2017.2”


Scenario: Atualização do status da resposta do aluno
    Given O professor “Marcio” enviou um convite para um aluno
    And Há uma notificação de convite enviado
    When Aluno aceitou ou rejeitou o convite
    Then A notificação de convite enviado some
    And Aparece uma notificação referente a resposta do aluno


Scenario: Limpar notificações
    Given O usuário “Lucas” está logado
    And Há alguma notificação para “Lucas”
    When “Lucas” limpa as notificações
    Then Nenhuma notificação aparecerá para “Lucas”
