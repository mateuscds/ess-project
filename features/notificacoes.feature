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


Scenario: visualizar notificação de atualização.
    Given que o aluno de CPF "123", NOME "lucas", EMAIL "lucas@cin" e SENHA "123" está cadastrado no sistema
    And o aluno de EMAIL "lucas@cin" foi convidado para uma turma de NOME "ip", CÓDIGO "222" e SEMESTRE "1" de pelo professor de CPF "456", NOME "marcio", EMAIL "marcio@cin" e SENHA "123"
    When atualiza as notificações
    Then uma notificação do atualização de convite pendente da turma de NOME "ip" e CÓDIGO "222" para o aluno de NOME "lucas" e CPF "123"


Scenario: clicar em uma notificação de convite.
    Given que o aluno de CPF "123", NOME "lucas", EMAIL "lucas@cin" e SENHA "123" está cadastrado no sistema
    And o aluno de EMAIL "lucas@cin" foi convidado para uma turma de NOME "algoritmos", CÓDIGO "333" e SEMESTRE "1" de pelo professor de CPF "456", NOME "marcio", EMAIL "marcio@cin" e SENHA "123"
    When o aluno de EMAIL "lucas@cin" e SENHA "123" loga no sistema 
    And atualiza as notificações
    And aluno de CPF "123" clica na notificação do convite para a turma de NOME "algoritmos" e CÓDIGO "333" pelo professor de NOME "marcio"
    Then está na página de minhas turmas

Scenario: clicar em uma notificação de atualização.
    Given que o aluno de CPF "123", NOME "lucas", EMAIL "lucas@cin" e SENHA "123" está cadastrado no sistema
    And o aluno de EMAIL "lucas@cin" foi convidado para uma turma de NOME "SD", CÓDIGO "444" e SEMESTRE "1" de pelo professor de CPF "456", NOME "marcio", EMAIL "marcio@cin" e SENHA "123"
    When o professor de EMAIL "marcio@cin" e SENHA "456" loga no sistema 
    And atualiza as notificações
    And professor de CPF "456" clica na notificação de atualização de convite para a turma de NOME "SD" e CÓDIGO "444" para o aluno de CPF "123"
    Then está na página da turma de NOME "SD" e CÓDIGO "444"


Scenario: atualização do status da resposta do aluno.
    Given que o aluno de CPF "678", NOME "joao", EMAIL "joao@cin" e SENHA "123" está cadastrado no sistema
    And o aluno de EMAIL "joao@cin" foi convidado para uma turma de NOME "MD", CÓDIGO "555" e SEMESTRE "1" de pelo professor de CPF "456", NOME "marcio", EMAIL "marcio@cin" e SENHA "123"
    When o aluno de EMAIL "joao@cin" e SENHA "123" loga no sistema 
    And atualiza as notificações
    And aluno de CPF "678" clica na notificação do convite para a turma de NOME "MD" e CÓDIGO "555" pelo professor de NOME "marcio"
    And clica em aceitar o convite para a turma de NOME "MD" e CÓDIGO "555"
    And atualiza as notificações
    Then notificação de convite para a turma de NOME "MD" e CÓDIGO "555" para o aluno de NOME "joao" e CPF "678" é removida


Scenario: limpar notificações de aluno.
    Given o aluno "lucas" está logado
    And ha alguma notificação para "lucas"
    When "lucas" limpa as notificações
    Then o notificador referente ao cpf de lucas ficará vazio no sistema

Scenario: limpar notificações de professor.
    Given o professor "lucas" está logado
    And ha alguma notificação para "lucas"
    When "lucas" limpa as notificações
    Then o notificador referente ao cpf de lucas ficará vazio no sistema


Scenario: notificador de aluno recém cadastrado é criado.
    Given que o aluno esteja na página de cadastro do sistema
    And não exista na memória do sistema um usuário cadastrado com um CPF "111.222.333-44"
    When o aluno preenche o CPF "111.222.333-44", o NOME "lucas", o E-MAIL "lucas@ufpe.br" e a SENHA "1234"
    Then o CPF "111.222.333-44" possuí um notificador válido no sistema

Scenario: notificador de professor recém cadastrado é criado.
    Given que o professor esteja na página de cadastro do sistema
    And não exista na memória do sistema um usuário cadastrado com um CPF "111.222.333-44"
    When o professor preenche o CPF "111.222.333-44", o NOME "lucas", o E-MAIL "lucas@ufpe.br" e a SENHA "1234"
    Then o CPF "111.222.333-44" possuí um notificador válido no sistema

