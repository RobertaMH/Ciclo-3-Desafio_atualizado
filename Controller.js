const express = require('express');
const cors = require('cors');

const models = require('./models');
const { Sequelize } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let itemcompra = models.ItemCompra;
let compra = models.Compra
let produto = models.Produto

app.get('/', function (req, res) {
    res.send("Olá, mundo!")
});

//exibir todos os pedidos dos clientes

app.get('/clientes/:id/compras', async (req, res) => {
    await compra.findAll({
        where: { ClienteId: req.params.id }
    }).then(compra => {
        return res.json({
            error: false,
            compra
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possivel de conectar"
        });
    });
});
// exibir todos os produtos dos clientes

app.get('/compras/:id/itemcompra', async (req, res) => {
    await item.findAll({
        where: { CompraId: req.params.id }
    }).then(item => {
        return res.json({
            error: false,
            item
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possivel de conectar"
        });
    });
});


//adicionar



app.post('/produtos', async (req, res) => {
    await produto.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: 'Produto adicionado com sucesso!!'
        });
    }).catch(function (erro) {

        return res.status(400).json({
            error: true,
            message: 'Foi impossivel adicionar produto'
        })
    });
});
app.post('/clientes', async (req, res) => {
    await cliente.create(
        req.body
    ).then(cli => {
        return res.json({
            error: false,
            message: 'Cliente adicionado com sucesso!!',
            cli
        });
    }).catch(function (erro) {

        return res.status(400).json({
            error: true,
            message: 'Foi impossivel adicionar cliente'
        })
    });
});

// app.post('/compras', async (req, res) => {
//     await compra.create(
//         req.body
//     ).then(function () {
//         return res.json({
//             error: false,
//             message: 'Compra realizada com sucesso!!'
//         });
//     }).catch(function (erro) {

//         return res.status(400).json({
//             error: true,
//             message: 'Foi impossivel realizar compra :('
//         })
//     });
// });

app.get('/clientes', async (req, res) => {
    await cliente.findAll()
        .then(cli => {
            return res.json({
                error: false,
                cli
            });
        })
        .catch((erro) => {
            return res.status(400).json({
                error: true,
                message: "Erro na conexão"
            });
        });
});

app.post('/compras', async (req, res) => {
    await compra.create(
        req.body
    )
        .then(function() {
            return res.json({
                error: false,
                message:"Compra criada com sucesso!!"
            });
        })
        .catch((erro) => {
            return res.status(400).json({
                error: true,
                message: "Erro na conexão"
            });
        });
});
app.get('/compras', async (req, res) => {
    await compra.findAll()
    
        .then(com => {
            return res.json({
                error: false,
                com
            });
        })
        .catch((erro) => {
            return res.status(400).json({
                error: true,
                message: "Erro na conexão"
            });
        });
});


app.post('/itemcompras', async (req, res) => {
    await itemcompra.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: 'ItemCompra adicionado com sucesso!!'
        });
    }).catch(function (erro) {

        return res.status(400).json({
            error: true,
            message: 'Foi impossivel adicionar ItemCompra'
        })
    });
});

//


app.get('/compras/:id', async (req, res) => {
    await compra.findByPk(req.params.id, { include: [{ all: true }] })
        .then(ped => {
            return res.json({ ped });
        });
});

app.get('/produto/:id/compras', async (req, res) => {
    await itemcompra.findAll({
        where: { ProdutoId: req.params.id }
    })
        .then(item => {
            return res.json({
                error: false,
                item
            });
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                messege: 'Erro: código não encontrado!'
            });
        });
});

app.get('/compras/:id/produto', async (req, res) => {
    await compra.findAll({
        where: { ProdutoId: req.params.id }
    })
        .then(item => {
            return res.json({
                error: false,
                item
            });
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                messege: 'Erro: código não encontrado!'
            });
        });
});

app.get('/clientes-compras', async (req, res) => {
    await cliente.findAll({ include: [{ all: true }] })
        .then(cli => {
            return res.json({
                error: false,
                cli
            });
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                messege: 'Erro: código não encontrado!'
            });
        });
});
app.put('/clientes/:id/compras', async (req, res) => {
    const ped = {
        ClienteId: req.params.id,
        data: req.body.data
    };

    if (!await cliente.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Cliente não encontrado'
        });
    };

    await compra.update(ped, {
        where: Sequelize.and({ ClienteId: req.params.id },
            { id: req.body.id })
    }).then(compras => {
        return res.json({
            error: false,
            message: "Seu produto foi alterado!",
            compras
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possivel alterar"
        });
    });
});




//listas



app.get('/listacliente', async (req, res) => {

    await cliente.findAll({

        order: [['nome', 'ASC']]
    }).then(function (cliente) {
        res.json({ cliente })
    });
});

app.get('/listacompra', async (req, res) => {

    await compra.findAll({

        order: [['data', 'ASC']]
    }).then(function (compra) {
        res.json({ compra })
    });
});

app.get('/listaprodutos', async (req, res) => {

    await produto.findAll({

        order: [['nome', 'ASC']]
    }).then(function (produto) {
        res.json({ produto })
    });
});

app.get('/listaitemcompra', async (req, res) => {

    await itemcompra.findAll({

        order: [['quantidade', 'ASC']]
    }).then(function (itemcompra) {
        res.json({ itemcompra })
    });
});



//atualizar

app.put('/atualizacliente', async (req, res) => {
    await cliente.update(req.body, {
        where: { id: req.body.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Cliente atualizado com sucesso!"
        })
    }).catch(function () {
        return res.status(400).json({
            error: true,
            message: "Erro em alterar o cliente."
        });
    });
});

app.put('/atualizaproduto', async (req, res) => {
    await produto.update(req.body, {
        where: { id: req.body.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Produto atualizado com sucesso!"
        })
    }).catch(function () {
        return res.status(400).json({
            error: true,
            message: "Erro em alterar o produto."
        });
    });
});
app.put('/atualizacompra', async (req, res) => {
    await compra.update(req.body, {
        where: { id: req.body.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Compra atualizado com sucesso!"
        })
    }).catch(function () {
        return res.status(400).json({
            error: true,
            message: "Erro em alterar a compra."
        });
    });
});



//editar pedido
app.get('/compras/:id', async (req, res) => {
    compra.findByPk(req.params.id)
    .then(compra =>{
        return res.json({
            error: false,
            compra
        });
    }).catch (erro =>{
        return res.status(400).json({
            error:true,
            message: "Erro:não foi possivel acesar API"
        });
    });
});


app.get('/compras/:id', async (req, res) => {
    compra.findByPk(req.params.id)
        .then(compra => {
            return res.json({
                error: false,
                compra
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Erro: não foi possivel acessar API"
            });
        });
});

//alterar a compra com base no id da compra
app.put('/compras/:id', async (req, res) => {
    const ped = {
        id:req.params.id,
        ClienteId: req.body.ClienteId,
        data: req.body.data
    };

    if (!await cliente.findByPk(req.body.ClienteId)) {
        return res.status(400).json({
            error: true,
            message: 'Cliente não encontrado'
        });
    };

    await compra.update(ped, {
        where: Sequelize.and({ ClienteId: req.body.ClienteId },
            { id: req.body.id })
    }).then(ped => {
        return res.json({
            error: false,
            message: "Seu produto foi alterado!",
            ped
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possivel alterar"
        });
    });
});

//alterar a produto com base no id do produto
app.put('/produtos/:id', async (req, res) => {
    const pro = {
        id:req.params.id,
        CompraId: req.body.CompraId,
        valor: req.body.valor,
        quantidade: req.body.quantidade

    };

    if (!await produto.findByPk(req.body.ProdutoId)) {
        return res.status(400).json({
            error: true,
            message: 'Produto não encontrado'
        });
    };

    await compra.update(pro, {
        where: Sequelize.and({ ProdutoId: req.body.ProdutoId },
            { id: req.body.id })
    }).then(pro => {
        return res.json({
            error: false,
            message: "Seu produto foi alterado!",
            pro
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possivel alterar"
        });
    });
});




app.put('/compras/:id/editaritem', async (req, res) => {
    const item = {
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };

    if (!await compra.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Compra não encontrado'
        });
    };
    if (!await produto.findByPk(req.body.ProdutoId)) {
        return res.status(400).json({
            error: true,
            message: 'Produto não encontrado'
        });
    };

    await itemcompra.update(item, {
        where: Sequelize.and({ ProdutoId: req.body.ProdutoId },
            { CompraId: req.params.id })
    }).then(function (itens) {
        return res.json({
            error: false,
            message: "Seu produto foi alterado!",
            itens
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possivel alterar"
        });
    });
});


//excluir



app.delete('/excluircliente/:id', async (req, res) => {
   await cliente.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "cliente for excluido com sucesso."
        });
    }).catch(erro=> {
        return res.status(400).json({
            error: true,
            messege: "Erro ao excluir o cliente."
        });
    });
});

app.delete('/excluirproduto/:id', async (req, res) => {
    produto.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "produto for excluido com sucesso."
        });
    }).catch(function () {
        return res.status(400).json({
            error: true,
            messege: "Erro ao excluir produto."
        });
    });
});

app.get('/excluircompra/:id', async (req, res) => {
    compra.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Compra for excluido com sucesso."
        });
    }).catch(function () {
        return res.status(400).json({
            error: true,
            messege: "Erro ao excluir compra :("
        });
    });
});

app.get('/excluiritemcompra/:id', async (req, res) => {
    itemcompra.destroy({
        where: { CompraId: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "ItemCompra for excluido com sucesso."
        });
    }).catch(function () {
        return res.status(400).json({
            error: true,
            messege: "Erro ao excluir itemcompra :("
        });
    });
});



let port = process.env.PORT || 3001;

app.listen(port, (req, res) => {
    console.log('Servidor ativo: http://localhost:3001');
})