Feature : Criação e Gerenciamento de Turmas

    As a: professor
    I want to: ser capaz de criar uma turma
    So that: seja possível gerenciar os alunos dessa turma


CENÁRIOS DE GUI

Cenário: Acesso à página de criação de uma nova turma

    Given: o professor "Marcio" está na página inicial do portal "Minhas turmas"
    When: quando o professor "Paulo" solicitar a opção de criar turma
    Then: é possível visualizar na tela a página de "Cadastro de nova turma".


Cenário: Cadastro das informações de uma nova turma - bem sucessido

    Given: o professor "Marcio" está na página de "Cadastro de uma nova turma"
    When: o professor "Marcio" preeche as informações de nome, código e semestre da turma com "Engenharia de Software e Sistemas - 2020.2",  "IF895" e "6º Período", respectivamente.
    And: solicita cadastrar a turma
    Then: o professor "Marcio" consegue visualizar uma mensagem avisando que o cadastro das informações da turma "IF695" foi feito com sucesso.


Cenário: Cadastro das informações de uma nova turma - mal sucessido

    Given: o professor "Marcio" está na página de "Cadastro de uma nova turma"
    When: o professor "Marcio" preeche as informações de código e semestre da turma com "IF895" e "6º Período", respectivamente.
    And: solicita cadastrar a turma
    Then: o professor "Marcio" consegue visualizar uma mensagem avisando que o cadastro não pode ser realizado


Cenário: Cadastro de aluno durante a criação de uma turma - bem sucedido

    Given: o professor "Marcio" está na página de "Cadastro de nova turma"
    And: as informações de nome e código já estão preenchidos com "Engenharia de Software e Sistemas - 2020.2" e "IF895", respectivamente
    When: quando o professor "Marcio" solicitar a opção de convidar alunos e inserir o e-mail "mcs8@cin.ufpe.br"
    Then: o professor "Marcio" consegue visualizar uma mensagem informando que o convite foi enviado com sucesso


Cenário: Cadastro de aluno durante a criação de uma turma - mal sucedido

Given: o professor "Marcio" está na página de "Cadastro de nova turma"
And: as informações de nome e código já estão preenchidos com "Engenharia de Software e Sistemas - 2020.2" e "IF895", respectivamente
When: quando o professor solicitar a opção de convidar aluno e não inserir nenhum e-mail
Then: o professor "Marcio" consegue visualizar uma mensagem informando que o não é possível convidar um aluno sem informar um e-mail.


Cenário: Aceitação do convite pelo aluno

Given: o aluno "Mateus" está na página inicial do portal de "Minhas turmas"
When: quando o aluno solicitar aceitar o convite enviado referente à turma "IF689"
Then: ele consegue visualizar que agora ele faz parte da turma "IF689".



CENÁRIOS DE SERVIÇO

Cenário: Cadastro das informações de uma nova turma - bem sucecido

    Given: a turma "IF687" não esteja cadastrada no sistema
    And: e não existem outras turmas cadastradas no sistema
    When: quando "Marcio" com cadastro de "Professor" preencher as informações de nome com "Engenharia de Software e Sistemas", código com "IF687" e semestre com "6º"
    And: solicitar cadastrar a turma
    Then: a turma é salva no sistema.


Cenário: Cadastro das informações de uma nova turma - mal sucecido

    Given: a turma "IF689" esteja cadastrada no sistema
    And: e não existem outras turmas cadastradas no sistema
    When: quando "Marcio" com cadastro de "Professor" preencher as informações de nome com "Compiladores", código com "IF689" e semestre com "6º"
    And: solicitar cadastrar a turma
    Then: a turma não é salva no sistema pois já existe uma turma com esse código.


Cenário: Cadastro das novas informações de uma turma - 3

    Given: a turma "IF887" esteja cadastrada no sistema
    When: quando "Marcio" com cadastro de "Professor" preencher as informações de nome com "Logica", código com "IF789" e semestre com "2º"
    And: solicitar cadastrar a turma
    Then: a turma é salva no sistema
    And: a turma "IF887" pernanece salva no sistema.


Cenário - Cadastro de aluno durante a criação de uma turma - bem sucecido

    Given: o professor "Marcio" de CPF "123" tenha cadastro de professor no sistema
    And: e já existe a turma de nome "Calculo 2", código "IF777" e semestre "2º"
    When: quando o professor enviar o convite para o aluno de e-mail "mcs8@cin.ufpe.br"
    Then: o e-mail "mcs8@cin.ufpe.br" do aluno permanece salvo no sistema, referente à turma "IF777"


Cenário - Cadastro de um aluno durante a criação de uma turma - mal sucessido
    Given: o professor "Marcio" de CPF "123" tenha cadastro de professor no sistema
    And: e já existe a turma de nome "Calculo 3", código "IF778" e semestre "3º"
    When: quando o professor solicitar enviar o convite para o aluno "Mateus" sem email preenchido
    Then: o aluno "Mateus" não será salvo no sistema, referente à turma "IF778".


Cenário - Aceitação do convite pelo aluno

    Given: o aluno "Igor" está na página inicial do portal de "Minhas turmas"
    And: o aluno "Igor" está cadastrado no sistema na turma "IF858"
    When: quando o aluno "Mateus" aceitar o convite enviado referente à turma "IF858"
    Then: o sistema cadastra o aluno "Igor" na turma "IF858".
