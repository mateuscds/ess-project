Feature: Buscar uma dúvida
    As a : Aluno
    I want to: Buscar uma duvida existente
    So that: Eu possa verificar a resposta.

Scenario: Busca de uma dúvida existente.
			Given Eu estou na página “Sistema de Dúvidas”
			And Tenho uma dúvida com título “O que são stakeholders?” 
	        And Tenho uma dúvida com título “Qual diferença entre requisitos funcionais e não funcionais?” 
			When Eu insiro a busca por “O que são stakeholders?”
			And Confirmo a busca
            Then Eu continuo na página “Sistema de Dúvidas”
            And Eu consigo ver a dúvida com título “O que são stakeholders?” .

Scenario: Busca de uma dúvida inexistente.
			Given Eu estou na página “Sistema de Dúvidas”
			And Tenho uma dúvida com título “O que são stakeholders?” 
	        And Tenho uma dúvida com título “Qual diferença entre requisitos funcionais e não funcionais?” 
			When Eu insiro a busca por “O que são requisitos?”
			And Confirmo a busca
            Then Eu continuo na página “Sistema de Dúvidas”
            And Eu tenho “0” dúvidas encontradas.

Scenario: Busca de uma dúvida a partir de uma string vazia.
			Given Eu estou na página “Sistema de Dúvidas”
			And Tenho uma dúvida com título “O que são stakeholders?” 
        	And Tenho uma dúvida com título “Qual diferença entre requisitos funcionais e não funcionais?” 
			When Eu insiro a busca por “”
			And Confirmo a busca
            Then Eu continuo na página “Sistema de Dúvidas”
            And Eu tenho “0” dúvidas encontradas.
		
Scenario: Busca com erro de digitação de uma dúvida existente.
            Given Eu estou na página “Sistema de Dúvidas”
            And Tenho uma dúvida com título “O que são stakeholders?” 
            And Tenho uma dúvida com título “Qual diferença entre requisitos funcionais e não funcionais?” 
            When Eu insiro a busca por “O que são stakeholdrs”
            And Confirmo a busca
            Then Eu continuo na página “Sistema de Dúvidas”
            And Eu tenho “0” dúvidas encontradas.
            And Eu vejo uma mensagem de erro, pedindo uma entrada válida.

Scenario: Busca por dúvidas ainda não respondidas.
			Given Eu estou na página “Sistema de Dúvidas”
			And Tenho uma dúvida com título “O que são stakeholders?” e está "respondida" 
	        And Tenho uma dúvida com título “Qual diferença entre requisitos funcionais e não funcionais?” e está "não-respondida"
			When Eu seleciono apenas perguntas "não respondida"
			And Confirmo a busca
            Then Eu continuo na página “Sistema de Dúvidas”
            And Eu consigo ver a dúvida com título “Qual diferença entre requisitos funcionais e não funcionais?”

Scenario: Busca por dúvidas respondidas.
			Given Eu estou na página “Sistema de Dúvidas”
			And Tenho uma dúvida com título “O que são stakeholders?” e está "respondida" 
	        And Tenho uma dúvida com título “Qual diferença entre requisitos funcionais e não funcionais?” e está "não-respondida"
			When Eu seleciono apenas perguntas "respondida"
			And Confirmo a busca
            Then Eu continuo na página “Sistema de Dúvidas”
            And Eu consigo ver "1" dúvida
            And Eu consigo ver a dúvida com título “O que são stakeholders?”

Scenario: Busca por uma dúvida no sistema.
			Given Eu tenho salvo no sistema a dúvida "O que são stakeholders?"
			And Eu tenho salvo no sistema a dúvida "Qual diferença entre requisitos funcionais e não funcionais?"
			When Eu realizo uma busca por "O que são stakeholders?"
			Then Eu recebo a dúvida "O que são stakeholders?"
			And Eu tenho salvo no sistema a dúvida "O que são stakeholders?"
			And Eu tenho salvo no sistema a dúvida "Qual diferença entre requisitos funcionais e não funcionais?"