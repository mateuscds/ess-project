Feature: Cadastro e Login de Alunos/Professores
    As a: aluno/professor
    I want to: ser capaz de criar uma conta ou logar em uma já existente
    So that: seja possível utilizar a plataforma


Scenario: cadastro bem sucedido de aluno.
    Given que o usuário esteja na página de cadastro do sistema
    And seja selecionada a opção de cadastro de aluno
    When o usuário preenche o CPF "111.222.333-44", o NOME "João", o E-MAIL "joao@ufpe.br" e a SENHA "1234"
    And solicita a realização do cadastro
    Then aparece uma mensagem de confirmação do cadastro na tela

Scenario: cadastro bem sucedido de professor.
    Given que o usuário esteja na página de cadastro do sistema
    And seja selecionada a opção de cadastro de professor
    When o usuário preenche o CPF "155.266.377-44", o NOME "Júlia", o E-MAIL "julia@ufpe.br" e a SENHA "1615"
    And solicita a realização do cadastro
    Then aparece uma mensagem de confirmação do cadastro na tela

Scenario: cadastro mal sucedido com CPF já cadastrado.
    Given que o usuário esteja na página de cadastro do sistema
    And exista um usuário cadastrado com o CPF "999.888.777-66"
    When o usuário preenche o CPF "999.888.777-66", o NOME "Gabriel", o E-MAIL "gabriel@ufpe.br" e a SENHA "9876" 
    And solicita a realização do cadastro
    Then aparece uma mensagem de erro na tela, informando que o cadastro não foi concluído e que já existe um usuário com esse "CPF"

Scenario: cadastro mal sucedido com E-MAIL já cadastrado.
    Given que o usuário esteja na página de cadastro do sistema
    And exista um usuário cadastrado com o E-MAIL "rafael@ufpe.br"
    When o usuário preenche o CPF "555.777.888-99", o NOME "Rafael", o E-MAIL "rafael@ufpe.br" e a SENHA "1212" 
    And solicita a realização do cadastro
    Then aparece uma mensagem de erro na tela, informando que o cadastro não foi concluído e que já existe um usuário com esse "E-MAIL"

Scenario: cadastro mal sucedido por falta de CPF.
    Given que o usuário esteja na página de cadastro do sistema
    When o usuário preenche NOME "Maria", o E-MAIL "maria@ufpe.br" e SENHA "4545"
    And solicita a realização do cadastro
    Then aparece uma mensagem de erro na tela, informando que o cadastro não foi concluído pois o campo "CPF" não foi preenchido

Scenario: cadastro mal sucedido por falta de E-MAIL.
    Given que o usuário esteja na página de cadastro do sistema
    When o usuário preenche CPF "111.333.555-77", NOME "Luciana" e SENHA "3030"
    And solicita a realização do cadastro
    Then aparece uma mensagem de erro na tela, informando que o cadastro não foi concluído pois o campo "E-MAIL" não foi preenchido

Scenario: login bem sucedido.
    Given que o usuário esteja na página de login do sistema
    And existe um usuário cadastrado com E-MAIL "jefferson@ufpe.br" e SENHA "1234"
    When o usuário preencher E-MAIL "jefferson@ufpe.br" e SENHA "1234"
    And solicia a realização do login
    Then o login é concluído com sucesso e é iniciada uma sessão para o usuário de E-MAIL "jefferson@ufpe.br"

Scenario: login mal sucedido.
    Given que o usuário esteja na página de login do sistema
    When o usuário preencher E-MAIL "vitor@ufpe.br" e SENHA "9009"
    And solicia a realização do login
    Then o login não é concluído e aparece uma mensagem informando que alguma informação está incorreta