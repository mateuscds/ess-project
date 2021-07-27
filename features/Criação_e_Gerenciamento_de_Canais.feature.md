# Cenários - Criação/Gerenciamento de Canais de Dúvidas

- Feature: Criação/Gerenciamento de canais de dúvida

    As a professor

    I want to criar um novo canal de dúvidas, referente a um assunto da disciplina

    So that os alunos consigam publicar suas dúvidas no canal correspondente

Cenários de GUI

- Scenario: Criação de canal já existente

    Given Estou logado no sistema como professor

    When Estou tentando criar um canal de dúvidas sobre o assunto 'Requisitos'

    Then Uma mensagem informando que o canal já existe aparece

    And Sou direcionado para o quadro inicial de criação de canais 

- Scenario: Criação de canal novo/não existente

    Given Estou logado no sistema como professor

    When Estou tentando criar um canal de dúvidas sobre o assunto 'Requisitos'

    Then Uma mensagem de novo canal criado aparece

    And Outro quadro aparece, questionando se desejo criar mais algum canal 

- Scenario: Criação de canal novo/não existente mal sucedida

    Given Estou logado no sistema como professor

    When Estou tentando criar um canal para o assunto 'Requisitos'  

    And  Alguma falha de comunicação ocorre 

    Then Aparece na tela uma mensagem de erro informando que a criação do canal não pode ser concluída, devido a um erro de conexão, por exemplo

    And Sou direcionado para o quadro imediatamente anterior à conclusão de criação do novo canal para nova tentativa 

Cenários de Serviço

- Scenario: Criação de canal já existente

    Given Estou logado no sistema como professor

    And Existe um canal para o assunto 'Requisitos' 

    When Estou tentando criar um canal de dúvidas sobre o assunto 'Requisitos'

    Then a memória do sistema não é alterada e nenhum canal novo é criado 

- Scenario: Criação de canal novo/não existente

    Given Estou logado no sistema como professor

    And Não existe um canal para o assunto 'Requisitos' 

    When Estou tentando criar um canal de dúvidas sobre o assunto 'Requisitos'

    Then Um canal para o assunto 'Requisitos' é criado e a memória do sistema atualizada com este novo canal

- Scenario: Criação de canal novo/não existente mal sucedida

    Given Estou logado no sistema como professor

    And Não existe um canal para o assunto 'Requisitos' 

    When Estou tentando criar um canal para o assunto 'Requisitos'  

    And  Alguma falha de comunicação com a rede ocorre 

    Then Nenhuma alteração na memória do sistema é realizada 

    And O sistema direciona para o quadro imediatamente anterior ao de conclusão de criação de novo canal para nova tentativa.