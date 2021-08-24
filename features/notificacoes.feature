Feature: Notificador de atualização e convites

    As a: usuário
    I want to: ver suas notificações
    So that: pode-se ver uma lista de notificações

Scenario: visualizar notificações.
    Given: o usuário "lucas" está logado
    When: "lucas" atualiza as "Notificações"
    Then: aparece uma lista de notificações referentes a "lucas"

Scenario: visualizar notificação de convite.
    Given: o usuário "lucas" está logado como Aluno
    And: "lucas" foi convidado para uma turma pelo professor "marcio"
    When: "lucas" atualiza as "Notificações"
    Then: uma notificação do convite da turma vindo do professor "marcio" aparece na tela


Scenario: clicar em uma notificação de convite.
    Given: o usuário "lucas" está logado como Aluno
    And: "lucas" está na janela de "Notificações"
    And: existe a notificação de um convite para a turma "ess 2017.2"
    When: "lucas" clica na notificação do convite para a turma
    Then: a página é redirecionada para a página da turma "ess 2017.2"


Scenario: visualização de notificação de convite enviado.
    Given: o usuário "marcio" está logado como Professor
    And: "marcio" enviou um convite para um aluno de email "lucas@cin.ufpe.br" para a turma "ess 2017.2"
    When: "marcio" vai para aba de "Notificações"
    Then: consegue visualizar uma notificação que o convite para o aluno de email "lucas@cin.ufpe.br" foi enviado


Scenario: visualização de convite aceito.
    Given: O usuário "marcio" está logado como Professor
    And: "marcio" enviou um convite para um aluno de email "lucas@cin.ufpe.br" para a turma "ess 2017.2"
    When: "marcio" vai para aba de "Notificações"
    Then: consegue visualizar uma notificação que o aluno de email "lucas@cin.ufpe.br" aceitou o convite

Scenario: visualização de convite rejeitado.
    Given: o usuário "marcio" está logado como Professor
    And: "marcio" enviou um convite para um aluno de email "lucas@cin.ufpe.br" para a turma "ess 2017.2"
    When: "marcio" vai para aba de "Notificações"
    Then: consegue visualizar uma notificação que o aluno de email "lucas@cin.ufpe.br" rejeitado o convite

Scenario: clicar em uma notificação de resposta de convite.
    Given: o usuário "marcio" está logado como Professor
    And: "marcio" está na janela de "Notificações"
    And: existe a notificação de aceitação ou rejeição de convite para a turma "ess 2017.2"
    When: "marcio" clica na notificação da resposta do convite
    Then: a página é redirecionada para a página da turma "ess 2017.2"


Scenario: atualização do status da resposta do aluno.
    Given: a professor "marcio" enviou um convite para um aluno
    And: ha uma notificação de convite enviado
    When: aluno aceitou ou rejeitou o convite
    Then: a notificação de convite enviado some
    And: aparece uma notificação referente a resposta do aluno


Scenario: limpar notificações de aluno.
    Given: o aluno "lucas" está logado
    And: ha alguma notificação para "lucas"
    When: "lucas" limpa as notificações
    Then: o notificador referente ao cpf de lucas ficará vazio no sistema

Scenario: limpar notificações de professor.
    Given: o professor "lucas" está logado
    And: ha alguma notificação para "lucas"
    When: "lucas" limpa as notificações
    Then: o notificador referente ao cpf de lucas ficará vazio no sistema


Scenario: notificador de aluno recém cadastrado é criado.
    Given: que o aluno esteja na página de cadastro do sistema
    And: não exista na memória do sistema um usuário cadastrado com um CPF "111.222.333-44"
    When: o aluno preenche o CPF "111.222.333-44", o NOME "lucas", o E-MAIL "lucas@ufpe.br" e a SENHA "1234"
    Then: o CPF "111.222.333-44" possuí um notificador válido no sistema

Scenario: notificador de professor recém cadastrado é criado.
    Given: que o professor esteja na página de cadastro do sistema
    And: não exista na memória do sistema um usuário cadastrado com um CPF "111.222.333-44"
    When: o professor preenche o CPF "111.222.333-44", o NOME "lucas", o E-MAIL "lucas@ufpe.br" e a SENHA "1234"
    Then: o CPF "111.222.333-44" possuí um notificador válido no sistema

