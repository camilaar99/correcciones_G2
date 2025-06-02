const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const sequelize = db.sequelize;

// Helper to map group letter to ID
const grupoElegido = grupo => {
    const map = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8 };
    return map[grupo] || null;
};

const controller = {
    productView2: async (req, res) => {
        try {
            const result = await db.Product.findAll({ include: [{ association: 'grupo_equipo' }] });
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    productView: async (req, res) => {
        try {
            const result = await db.Product.findAll({ where: { size: 'Small' } });
            res.render('shop', { products: result });
        } catch (error) {
            res.status(500).send(error);
        }
    },

    productoDetail: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await db.Product.findByPk(id);
            res.render('product', { product: result });
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // Create - Form to create
    create: (req, res) => {
        res.render('crear');
    },

    // Create - Method to store
    store: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                await db.Product.create({
                    teamName: req.body.teamName,
                    size: req.body.size,
                    jugador: req.body.jugador,
                    imagen: req.file.filename,
                    price: req.body.price,
                    grupo_id: grupoElegido(req.body.grupo)
                });
                return res.redirect('/product');
            }
            res.render('crear', { errors: errors.array(), old: req.body });
        } catch (e) {
            res.status(500).send(e);
        }
    },

    editPage: async (req, res) => {
        try {
            const productos = await db.Product.findAll();
            res.render('modificar', { usuarios: productos });
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // Update - Form to edit
    edit: async (req, res) => {
        try {
            const id_producto = req.params.id;
            const edited = await db.Product.findByPk(id_producto, { include: ['grupo_equipo'] });
            if (edited && edited.grupo_equipo) {
                edited.grupo = edited.grupo_equipo.grupo;
            }
            res.render('editar', { id_producto, productToEdit: edited, title: edited ? edited.teamName : '' });
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // Update - Method to update
    update: async (req, res) => {
        try {
            const errors = validationResult(req);
            const id_producto = req.params.id;
            if (errors.isEmpty()) {
                await db.Product.update({
                    teamName: req.body.teamName,
                    size: req.body.size,
                    jugador: req.body.jugador,
                    imagen: req.file.filename,
                    price: req.body.price,
                    grupo_id: grupoElegido(req.body.grupo)
                }, {
                    where: { id: id_producto }
                });
                return res.redirect('/product');
            }
            const old = {
                id: id_producto,
                teamName: req.body.teamName,
                size: req.body.size,
                jugador: req.body.jugador,
                price: req.body.price,
                grupo: req.body.grupo
            };
            res.render('editar', { errors: errors.array(), productToEdit: old });
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // Delete - Delete one product from DB
    destroy: async (req, res) => {
        try {
            const id_producto = req.params.id;
            await db.Product.destroy({ where: { id: id_producto }, force: true });
            res.redirect('/product/edit');
        } catch (error) {
            res.status(500).send(error);
        }
    }
};

module.exports = controller;