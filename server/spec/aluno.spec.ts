import { Aluno } from '../../common/aluno';

describe("O aluno", () => {

    it("calcula a máscara corretamente", () => {
        let aluno_teste = new Aluno('344.534.743-87', 'Aurora', 'aurora@ufpe.br', '3742');

        //calculando máscara da forma correta
        var parte1 = aluno_teste.Cpf.substring(0, 3);
        var parte2 = aluno_teste.Cpf.substring(3, 6);
        var parte3 = aluno_teste.Cpf.substring(6, 9);
        var parte4 = aluno_teste.Cpf.substring(9, 11);
        var parte1_numero = 4*Number(parte1);
        var parte2_numero = 3*Number(parte2);
        var parte3_numero = 2*Number(parte3);
        var parte4_numero = Number(parte4);
        let mascara_correta = "" + parte1_numero + '_' + parte2_numero + '_' + parte3_numero + '_' + parte4_numero;
        
        //checando se a máscara calculada pela classe é a esperada
        expect(aluno_teste.Mascara).toEqual(mascara_correta);
    })

})