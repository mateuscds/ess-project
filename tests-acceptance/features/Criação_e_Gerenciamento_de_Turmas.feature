Feature: Criação e Gerenciamento de Turmas

    As a: professor
    I want to: ser capaz de criar uma turma
    So that: seja possível gerenciar os alunos dessa turma


Scenario: Cadastro das informações de uma nova turma - bem sucessido

    Given que o professor de CPF "100.200.300-40", NOME "Marcio", EMAIL "marcio@ufpe.br" e SENHA "marcio_123" está logado no sistema
    And esta na página de criação de turma
    When ele preenche as informações de nome, código e semestre da turma com "Engenharia de Software e Sistemas",  "IF895" e "6º", respectivamente.
    And solicita cadastrar a turma
    Then ele consegue visualizar uma mensagem avisando que o cadastro da turma foi feito com sucesso.


Scenario: Cadastro das informações de uma nova turma - mal sucessido

    Given que o professor de CPF "899.277.377-45", NOME "Julio", EMAIL "julio@ufpe.br" e SENHA "julio_123" está logado no sistema
    And esta na página de criação de turma
    When ele preenche as informações de código e semestre da turma com "IF888" e "6º", respectivamente.
    And solicita cadastrar a turma
    Then ele consegue visualizar uma mensagem avisando que o cadastro não pode ser realizado


Scenario: Convite de aluno - bem sucedido

    Given que o aluno de CPF "876.266.300-40", NOME "Mateus", EMAIL "mateus@ufpe.br" e SENHA "mateus_123" está cadastrado no sistema
    And que o professor de CPF "566.200.300-40", NOME "Jefferson", EMAIL "jef@ufpe.br" e SENHA "jef_123" está logado no sistema
    And existe a turma de NOME "Compiladores", CODIGO "IF777" e SEMESTRE "7º"
    And o professor esta na página de gerenciamento dessa turma de código "IF777"
    When quando ele preencher o aluno de EMAIL "mateus@ufpe.br"
    And solicitar que o convite seja enviado
    Then ele consegue visualizar uma mensagem informando que o convite foi enviado com sucesso


Scenario: Convite de aluno - mal sucedido

    Giver que o professor de CPF "544.233.300-48", NOME "job", EMAIL "job@ufpe.br" e SENHA "job_123" está logado no sistema
    And existe a turma de NOME "Calculo 1", CODIGO "IF899" e SEMESTRE "1º"
    And o professor esta na página de gerenciamento dessa turma de código "IF899"
    When solicitar que o convite seja enviado
    Then ele consegue visualizar uma mensagem informando que o convite não foi enviado com sucesso

Scenario: Aceitação do convite pelo aluno

    Given que o aluno de CPF "123.555.300-40", NOME "Hugo", EMAIL "hugo@ufpe.br" e SENHA "hugo_123" está cadastrado no sistema
    And que o professor de CPF "555.432.876-90", NOME "Pedro", EMAIL "pedro@ufpe.br" e SENHA "pedro_123" responsável pela turma de NOME "Calculo 2", CODIGO "IF534" e SEMESTRE "2º" tenha enviado um convite para o aluno de EMAIL "hugo@ufpe.br"
    And o aluno de EMAIL "hugo@ufpe.br" e SENHA "hugo_123" esteja logado no sistema
    And o aluno esteja na página de minhas turmas
    When quando o aluno solicitar aceitar o convite enviado referente à turma de código "IF534"
    Then ele consegue visualizar que as opções de aceitar e rejeitar o convite da turma de código "IF534" desaparecem da tela.