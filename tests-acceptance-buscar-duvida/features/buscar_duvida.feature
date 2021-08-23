Feature: Buscar uma dúvida
    As a : Aluno
    I want to: Buscar uma duvida existente
    So that: Eu possa verificar a resposta ou respondê-la.

Scenario: Busca de uma dúvida existente.
			Given Eu estou na página "Buscar Duvida"
			And Tenho uma dúvida com título "O que são stakeholders?" com estado "Concluída"
	        And Tenho uma dúvida com título "Qual diferença entre requisitos funcionais e não funcionais?" com estado "Concluída" 
			When Eu insiro a busca por "O que são stakeholders?"
			And Seleciono a opção "Concluídas e Não concluídas"
			And Confirmo a busca
            Then Eu continuo na página "Buscar Duvida"
            And Eu consigo ver somente a dúvida com título "O que são stakeholders?"

Scenario: Busca de uma dúvida inexistente.
			Given Eu estou na página "Buscar Duvida"
			And Tenho uma dúvida com título "O que são stakeholders?" com estado "Concluída"
	        And Tenho uma dúvida com título "Qual diferença entre requisitos funcionais e não funcionais?" com estado "Concluída"
			When Eu insiro a busca por "O que são requisitos?"
			And Seleciono a opção "Concluídas e Não concluídas"
			And Confirmo a busca
            Then Eu continuo na página "Buscar Duvida"
            And Eu consigo ver escrito "Nenhuma Dúvida Encontrada"

Scenario: Busca de uma dúvida a partir de uma string vazia.
			Given Eu estou na página "Buscar Duvida"
			And Tenho uma dúvida com título "O que são stakeholders?" com estado "Concluída"
        	And Tenho uma dúvida com título "Qual diferença entre requisitos funcionais e não funcionais?" com estado "Concluída"
			When Eu insiro a busca por ""
			And Seleciono a opção "Concluídas e Não concluídas"
			And Confirmo a busca
            Then Eu continuo na página "Buscar Duvida"
            And Eu consigo ver a dúvida com título "O que são stakeholders?"
			And Eu consigo ver a dúvida com título "Qual diferença entre requisitos funcionais e não funcionais?"

Scenario: Busca com erro de digitação de uma dúvida existente.
            Given Eu estou na página "Buscar Duvida"
            And Tenho uma dúvida com título "O que são stakeholders?" com estado "Concluída"
            And Tenho uma dúvida com título "Qual diferença entre requisitos funcionais e não funcionais?" com estado "Concluída"
            When Eu insiro a busca por "O que são stakeholdrs"
			And Seleciono a opção "Concluídas e Não concluídas"
            And Confirmo a busca
            Then Eu continuo na página "Buscar Duvida"
            And Eu consigo ver escrito "Nenhuma Dúvida Encontrada"

Scenario: Busca por dúvidas ainda não concluídas.
			Given Eu estou na página "Buscar Duvida"
			And Tenho uma dúvida com título "O que são stakeholders?" com estado "Concluída"
	        And Tenho uma dúvida com título "Como realizar testes?" com estado "Não Concluída"
			When Seleciono a opção "Não Concluídas"
			And Eu insiro a busca por ""
			And Confirmo a busca
            Then Eu continuo na página "Buscar Duvida"
            And Eu consigo ver a dúvida com título "Como realizar testes?"
			And Eu não consigo ver a dúvida com título "O que são stakeholders?"

Scenario: Busca por dúvidas concluídas.
			Given Eu estou na página "Buscar Duvida"
			And Tenho uma dúvida com título "O que são stakeholders?" com estado "Concluída"
	        And Tenho uma dúvida com título "Como realizar testes?" com estado "Não Concluída"
			When Seleciono a opção "Concluídas"
			And Eu insiro a busca por ""
			And Confirmo a busca
            Then Eu continuo na página "Buscar Duvida"
            And Eu consigo ver a dúvida com título "O que são stakeholders?"
			And Eu não consigo ver a dúvida com título "Como realizar testes?"
