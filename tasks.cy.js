/// <reference types="cypress" />  

describe('tarefas', () => { 

    it('deve cadastrar uam nova tarefa', () => {

        cy.request({ //consumindo a API Rest // O request vem antes, justamente para limpar o ambiente, caso tenha essa mesma tarefa já cadastrada
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: {name: 'Estudar Robot'}

        }).then(response => {
            expect(response.status).to.eq(204)
        })   //usado para pegar o resultado de retorno

        cy.visit('http://localhost:8080')
        cy.get('input[placeholder="Add a new Task"]')
            .type('Estudar Robot') 

        cy.contains('button', 'Create').click()  

        cy.contains('main div p', 'Estudar Robot') // como temos mais de uma tarefa cadastrada, ao passar o eçemento apenas .get não irá identificar, nesse caso use o cantains
            .should('be.visible')
            .should('have.text', 'Estudar Robot')
    })

    it.only('não deve permitir tarefa duplicada.', ()=> {   //usar only permite testar um teste separado do outro - porém existe testes que dependem de outro

        cy.request({ //consumindo a API Rest // O request vem antes, justamente para limpar o ambiente, caso tenha essa mesma tarefa já cadastrada
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: {name: 'Estudar Robot'}

        }).then(response => {
            expect(response.status).to.eq(204)
        })   //usado para pegar o resultado de retorno

        // Dado que eu tenho uma tarefa duplicada

        cy.visit('http://localhost:8080')
        cy.get('input[placeholder="Add a new Task"]')
            .type('Estudar JS') 

        cy.contains('button', 'Create').click() 

        //Quando faço o cadastro dessa tarefa

        cy.visit('http://localhost:8080')
        cy.get('input[placeholder="Add a new Task"]')
            .type('Estudar JS') 

        cy.contains('button', 'Create').click()  

        // Então vejo a mensagem de duplicidade

        cy.get('.swal2-html-container')
            .should('be.visible')
            .should('have.text', 'Task already exists!')
    })
    
    })



    
