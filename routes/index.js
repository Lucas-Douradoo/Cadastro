var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res) {
  try { const result = await global.db.selectClientes();
    console.log(result);
  res.render('index', { result });
}
catch (error) {
  res.redirect('/?erro=' + error);
}
})

/*GET EDIT PAGE. */
router.get('/edit/:id', async function (req, res) {
  const id = parseInt(req.params.id);
  try {
    const result = await global.db.selectCliente(id);
    res.render('new', { title: 'Edição de cliente', result, action: '/edit/' + id });
  }
  catch (error) {
    res.redirect('/?erro=' + error);
  }
})

/*GET NEW PAGE. */
router.get('/new', function(req, res, next){
  res.render('new', { title: "Cadatro de clientes",result: {}, action: "/new"})
})

/* POST NEW PAGE */
router.post('/new', async function(req, res) {
  const nome = req.body.nome
  const idade = !req.body.idade ? null : parseInt(req.body.idade);
  const uf = req.body.uf
    try {
      await global.db.insertCliente({nome, idade, uf });
      res.redirect('/?new=true');
    }
    catch (error) {
      res.redirect('/?erro=' + error);
    }
})

/* POST EDIT PAGE */
router.post('/edit/:id', async function(req, res) {
  const id = parseInt(req.params.id);
  const nome = req.body.nome;
  const idade = !req.body.idade ? null : parseInt(req.body.idade);
  const uf = req.body.uf;
    try {
      await global.db.updateCliente(id, { nome, idade, uf });
      res.redirect('/?edit=true');
    }
    catch (error) {
      res.redirect('/?erro=' + error);
    }
})


/*GET DELETE PAGE. */
router.get('/delete/:id', async function (req, res) {
  const id = parseInt(req.params.id);
  try {
   await global.db.deleteCliente(id);
   res.redirect('/?delete=true');
  }
  catch (error) {
    res.redirect('/?erro=' + error);
  }
})


module.exports = router;
