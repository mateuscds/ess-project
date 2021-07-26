Feature: Publicação/resposta de Dúvidas
    As a: aluno/professor
    I want to: publicar uma dúvida/responder uma dúvida
    So that: consiga sanar a minha dúvida ou a de outro

CENÁRIOS DE GUI

Scenario: Publicação de dúvida bem sucedida
    Given:  que o aluno "João" está na página de "Dúvidas" no sistema.
    And: a sua dúvida ainda não está armazenada no sistema.
    When: o aluno "João" preenche o título e descrição da sua dúvida com "Diferenças entre os requisitos funcionais e não funcionais" e "Não compreendi muito bem as diferenças entre esses dois tipos de requisitos".
    And: solicita a publicação da dúvida.
    Then: a dúvida foi armazena no sistema.
    And: o aluno "João" consegue visualizar a sua dúvida publicada.

Scenario: Publicação de dúvida existente 
    Given: a aluna "Ana" está na página "Dúvidas" no sistema.
    And: a sua dúvida já está armazenada no sistema.
    When: a aluna "Ana" preenche o título e a descrição da sua dúvida com "Requisitos são estáticos?" e "Não entendi muito bem se após a converssa com os stakeholders os requisitos ficam fixos".
    And: solicita a publicação da dúvida.
    Then: aparece uma mensagem informando que a dúvida já tinha sido cadastrada.
    And: A aluna "Ana" não visualiza nenhuma mudança nas dúvidas publicadas.

Scenario: Resposta de dúvida pelo professor
    Given: o professor "Márcio" está na thread de uma dúvida.
    And: a thread ainda não foi encerrada.
    When: o professor "Márcio" preenche a resposta na thread.
    And: solicita a publicação da resposta.
    Then: a resposta é publicada.
    And: o professor "Márcio" visualiza a sua resposta publicada na thread.

Scenario: Resposta de dúvida por um aluno.
    Given: o aluno "João" está na thread de uma dúvida.
    And: a thread ainda não foi encerrada.
    When: o aluno "João" preenche a resposta na thread.
    And: solicita a publicação da resposta.
    Then: a resposta é publicada.
    And: o aluno "João" visualiza a sua resposta publicada na thread.

Cenários de Serviços

Scenario: Publicação de dúvida bem sucedida
    Given: a dúvida do aluno "João" não está cadastrada no sistema.
    When: o aluno "João" preenche o título e descrição da sua dúvida com "Diferenças entre os requisitos funcionais e não funcionais" e "Não compreendi muito bem as diferenças entre esses dois tipos de requisitos".
    Then: a dúvida foi armazenada no sistema.

Scenario: Publicação de dúvida existente
    Given: a dúvida da aluna "Ana" já está armazenada no sistema.
    When: a aluna "Ana" preenche o título e a descrição da sua dúvida com "Requisitos são estáticos?" e "Não entendi muito bem se após a converssa com os stakeholders os requisitos ficam fixos".
    Then: aparece uma mensagem informando que a dúvida já tinha sido cadastrada.

Scenario: Resposta de dúvida pelo professor
    Given: o professor "Márcio" está na thread de uma dúvida.
    And: a thread ainda não foi encerrada.
    When: o professor "Márcio" preenche a resposta na thread.
    Then: a resposta é publicada.

Scenario: Resposta de dúvida por um aluno
    Given: o aluno "João" está na thread de uma dúvida.
    And: a thread ainda não foi encerrada.
    When: o aluno "João" preenche a resposta na thread.
    Then: a resposta é publicada.