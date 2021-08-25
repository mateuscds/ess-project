Feature: Notificador de atualização e convites

    As a: usuário
    I want to: ver suas notificações
    So that: pode-se ver uma lista de notificações

Scenario: visualizar notificações.
    Given que o usuario de CPF "123", NOME "lucas", EMAIL "lucas@cin" e SENHA "123" está logado no sistema
    When atualiza as notificações
    Then aparece uma lista de notificações referentes a ao usuário de NOME "lucas"

Scenario: visualizar notificação de convite.
    Given que o aluno de CPF "123", NOME "lucas", EMAIL "lucas@cin" e SENHA "123" está cadastrado no sistema
    And o aluno de EMAIL "lucas@cin" foi convidado para uma turma de NOME "ess", CÓDIGO "111" e SEMESTRE "1" de pelo professor de CPF "456", NOME "marcio", EMAIL "marcio@cin" e SENHA "123"
    When o aluno de EMAIL "lucas@cin" e SENHA "123" loga no sistema 
    And atualiza as notificações
    Then uma notificação do convite de turma de NOME "ess" e CÓDIGO "111" pelo professor de NOME "marcio"


# Scenario: clicar em uma notificação de convite.
#     Given o usuário "lucas" está logado como Aluno
#     And "lucas" está na janela de "Notificações"
#     And existe a notificação de um convite para a turma "ess 2017.2"
#     When "lucas" clica na notificação do convite para a turma
#     Then a página é redirecionada para a página da turma "ess 2017.2"


# Scenario: visualização de notificação de convite enviado.
#     Given o usuário "marcio" está logado como Professor
#     And "marcio" enviou um convite para um aluno de email "lucas@cin.ufpe.br" para a turma "ess 2017.2"
#     When "marcio" vai para aba de "Notificações"
#     Then consegue visualizar uma notificação que o convite para o aluno de email "lucas@cin.ufpe.br" foi enviado


# Scenario: visualização de convite aceito.
#     Given O usuário "marcio" está logado como Professor
#     And "marcio" enviou um convite para um aluno de email "lucas@cin.ufpe.br" para a turma "ess 2017.2"
#     When "marcio" vai para aba de "Notificações"
#     Then consegue visualizar uma notificação que o aluno de email "lucas@cin.ufpe.br" aceitou o convite

# Scenario: visualização de convite rejeitado.
#     Given o usuário "marcio" está logado como Professor
#     And "marcio" enviou um convite para um aluno de email "lucas@cin.ufpe.br" para a turma "ess 2017.2"
#     When "marcio" vai para aba de "Notificações"
#     Then consegue visualizar uma notificação que o aluno de email "lucas@cin.ufpe.br" rejeitado o convite

# Scenario: clicar em uma notificação de resposta de convite.
#     Given o usuário "marcio" está logado como Professor
#     And "marcio" está na janela de "Notificações"
#     And existe a notificação de aceitação ou rejeição de convite para a turma "ess 2017.2"
#     When "marcio" clica na notificação da resposta do convite
#     Then a página é redirecionada para a página da turma "ess 2017.2"


# Scenario: atualização do status da resposta do aluno.
#     Given a professor "marcio" enviou um convite para um aluno
#     And ha uma notificação de convite enviado
#     When aluno aceitou ou rejeitou o convite
#     Then a notificação de convite enviado some
#     And aparece uma notificação referente a resposta do aluno
