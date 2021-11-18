const express = require ('express');
const router = express.Router();
const pool = require('../database.js');

router.get('/', async (req, res) =>{
    let listAutos = await pool.query('SELECT * FROM autos');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listAutos: listAutos
    });
});

router.get('/:id_auto', async (req, res) =>{
    const { id_auto } = req.params;
    let auto = await pool.query('SELECT * FROM autos WHERE id_auto = ?', [id_auto]);
    res.json({
        status: 200,
        message: "Se ha obtenido correctamente",
        auto: auto
    });
});

router.post('/create', async (req, res) => {
    const { nombre, matricula, ano_verific, fecha_registro, fecha_actualizacion, estado, id_marca } = req.body;
    const auto = {
        nombre, matricula, ano_verific, fecha_registro, fecha_actualizacion, estado, id_marca
    };

    await pool.query('INSERT INTO autos set ?', [auto]);
    res.json({
        status: 200,
        message: "Se ha registrado correctamente",
        auto: auto
    })
});

router.post('/update/:id_auto', async (req, res) => {
    const { id_auto } = req.params;
    const { nombre, matricula, ano_verific, fecha_registro, fecha_actualizacion, estado, id_marca } = req.body;

    const auto = { nombre, matricula, ano_verific, fecha_registro, fecha_actualizacion, estado, id_marca };

    await pool.query('UPDATE autos SET ? WHERE id_auto = ?', [auto, id_auto]);
    res.json({
        status: 200,
        message: "Se ha actualizado correctamente",
        auto: auto
    })
})

router.post('/delete/:id_auto', async (req, res) => {
    const { id_auto } = req.params;
    
    await pool.query('DELETE FROM autos WHERE id_auto = ?', [id_auto]);
    res.json({
        status: 200,
        message: "Se ha eliminado correctamente",
    })
})

module.exports = router; 