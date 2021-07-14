Feature: Cadastro e Login de Alunos/Professores
    As a: aluno/professor
    I want to: ser capaz de criar uma conta ou logar em uma já existente
    So that: seja possível utilizar a plataforma

Cenários de GUI

Scenario: cadastro bem sucedido de aluno.
    Given: que o usuário esteja na página de cadastro do sistema
    And: não exista nenhum usuário cadastrado com o CPF "111.222.333-44"
    And: seja selecionada a opção de cadastro de aluno
    When: o usuário preenche o CPF "111.222.333-44", o NOME "João", o E-MAIL "joao@ufpe.br" e a SENHA "1234"
    Then: aparece uma mensagem de confirmação do cadastro na tela

Scenario: cadastro bem sucedido de professor.
    Given: que o usuário esteja na página de cadastro do sistema
    And: não exista nenhum usuário cadastrado com o CPF "155.266.377-44"
    And: seja selecionada a opção de cadastro de professor
    When: o usuário preenche o CPF "155.266.377-44", o NOME "Júlia", o E-MAIL "julia@ufpe.br" e a SENHA "1615"
    Then: aparece uma mensagem de confirmação do cadastro na tela

Scenario: cadastro mal sucedido com CPF já cadastrado.
    Given: dado que o usuário esteja na página de cadastro do sistema
    And: exista um usuário cadastrado com o CPF "999.888.777-66"
    When: o usuário preenche o CPF "999.888.777-66", o NOME "Gabriel", o E-MAIL "gabriel@ufpe.br" e a SENHA "9876" 
    Then: aparece uma mensagem de erro na tela, informando que o cadastro não foi concluído e que já existe um usuário com esse CPF

Scenario: cadastro mal sucedido com E-MAIL já cadastrado.
    Given: dado que o usuário esteja na página de cadastro do sistema
    And: exista um usuário cadastrado com o E-MAIL "rafael@ufpe.br"
    When: o usuário preenche o CPF "555.777.888-99", o NOME "Rafael", o E-MAIL "rafael@ufpe.br" e a SENHA "1212" 
    Then: aparece uma mensagem de erro na tela, informando que o cadastro não foi concluído e que já existe um usuário com esse E-MAIL

Scenario: cadastro mal sucedido por falta de CPF.
    Given: que o usuário esteja na página de cadastro do sistema
    When: o usuário preenche NOME "Maria", o E-MAIL "maria@ufpe.br" e SENHA "4545"
    Then: aparece uma mensagem de erro na tela, informando que o cadastro não foi concluído pois o campo CPF não foi preenchido

Scenario: cadastro mal sucedido por falta de CPF.
    Given: que o usuário esteja na página de cadastro do sistema
    When: o usuário preenche NOME "Maria", o E-MAIL "maria@ufpe.br" e SENHA "4545"
    Then: aparece uma mensagem de erro na tela, informando que o cadastro não foi concluído pois o campo CPF não foi preenchido

Scenario: login mal sucedido.
    Given: o usuário esteja na página de login do sistema
    And: não existe um usuário cadastrado com E-MAIL "vitor@ufpe.br" e SENHA "9009"
    When: o usuário preencher E-MAIL "vitor@ufpe.br" e SENHA "9009"
    Then: o login não é concluído e aparece uma mensagem de erro na tela, informando que alguma informação foi inserida incorretamente

Cenários de Serviço

Scenario: cadastro bem sucedido de aluno.
    Given: que o usuário esteja na página de cadastro do sistema
    And: não exista na memória do sistema um usuário cadastrado com um CPF "111.222.333-44"
    When: o usuário preenche o CPF "111.222.333-44", o NOME "João", o E-MAIL "joao@ufpe.br" e a SENHA "1234"
    Then: o CPF "111.222.333-44", o NOME "João", o E-MAIL "joao@ufpe.br", a SENHA "1234" e a MÁSCARA "Abh123" são cadastrados como um novo aluno na memória do sistema

Scenario: cadastro bem sucedido de professor.
    Given: que o usuário esteja na página de cadastro do sistema
    And: não exista na memória do sistema um usuário cadastrado com um CPF "155.266.377-44"
    When: o usuário preenche o CPF "155.266.377-44", o NOME "Júlia", o E-MAIL "julia@ufpe.br" e a SENHA "1615"
    Then: o CPF "155.266.377-44", o NOME "Júlia", o E-MAIL "julia@ufpe.br", a SENHA "1615" e a MÁSCARA "None" são cadastrados como um novo professor na memória do sistema

Scenario: cadastro mal sucedido com CPF já cadastrado.
    Given: dado que o usuário esteja na página de cadastro do sistema
    And: exista um usuário cadastrado na memória do sistema com o CPF "999.888.777-66"
    When: o usuário preenche o CPF "999.888.777-66", o NOME "Gabriel", o E-MAIL "gabriel@ufpe.br" e a SENHA "9876"
    Then: a memória do sistema não é alterada e um novo usuário duplicado não é criado

Scenario: cadastro mal sucedido com CPF já cadastrado.
    Given: dado que o usuário esteja na página de cadastro do sistema
    And: exista um usuário cadastrado na memória do sistema com o CPF "999.888.777-66"
    When: o usuário preenche o CPF "999.888.777-66", o NOME "Gabriel", o E-MAIL "gabriel@ufpe.br" e a SENHA "9876"
    Then: a memória do sistema não é alterada e um novo usuário duplicado não é criado

Scenario: cadastro mal sucedido por falta de CPF.
    Given: que o usuário esteja na página de cadastro do sistema
    When: o usuário preenche NOME "Maria", um E-MAIL "maria@ufpe.br" e SENHA "4545"
    Then: a memória do sistema não é alterada e o novo usuário não é cadastrado

Bianca Iz Sarabia