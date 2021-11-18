const express = require ('express');
const router = express.Router();
const pool = require('../database.js');

router.get('/', async (req, res) =>{
    let listMarcas = await pool.query('SELECT * FROM marca');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listMarcas: listMarcas
    });
});

router.get('/:id_marca', async (req, res) =>{
    const { id_marca } = req.params;
    let marca = await pool.query('SELECT * FROM marca WHERE id_marca = ?', [id_marca]);
    res.json({
        status: 200,
        message: "Se ha obtenido correctamente",
        marca: marca
    });
});

router.post('/create', async (req, res) => {
    const { nombre } = req.body;
    const marca = { nombre };
    await pool.query('INSERT INTO marca set ?', [marca]);
    res.json({
        status: 200,
        message: "Se ha registrado correctamente",
        marca: marca
    })
});

router.post('/update/:id_marca', async (req, res) => {
    const { id_marca } = req.params;
    const { nombre } = req.body;

    const marca = { nombre };

    await pool.query('UPDATE marca SET ? WHERE id_marca = ?', [marca, id_marca]);
    res.json({
        status: 200,
        message: "Se ha actualizado correctamente",
        marca: marca
    })
})

router.post('/delete/:id_marca', async (req, res) => {
    const { id_marca } = req.params;
    
    await pool.query('DELETE FROM marca WHERE id_marca = ?', [id_marca]);
    res.json({
        status: 200,
        message: "Se ha eliminado correctamente",
    })
})

module.exports = router;