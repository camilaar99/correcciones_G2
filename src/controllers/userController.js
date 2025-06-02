//const fs = require('fs');
const path = require('path');
var express = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const sequelize = db.sequelize;

const controller = {
    register: (req, res) => res.render('register'),

    saveRegister: async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                await db.User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    type: req.body.type,
                    avatar: req.file.filename
                });
                return res.redirect('./log');
            } catch (e) {
                return res.status(500).send(e);
            }
        }
        res.render('register', { errores: errors.array(), old: req.body });
    },

    login: (req, res) => res.render('log'),

    saveLogin: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('log', { errors: errors.array() });
        }
        try {
            const result = await db.User.findOne({ where: { email: req.body.email } });
            if (!result) {
                return res.render('log', { errors: [{ msg: 'Credenciales inválidas' }] });
            }
            if (!bcrypt.compareSync(req.body.password, result.password)) {
                return res.render('log', { errors: [{ msg: 'Contraseña incorrecta' }] });
            }
            let usuarioALoguearse = result;
            req.session.usuarioLogueado = usuarioALoguearse;
            if (usuarioALoguearse.type === 'Admin') {
                req.session.usuarioAdmin = usuarioALoguearse;
                res.cookie('admin', 'Admin', { maxAge: 60000 });
                if (req.body.recordame) {
                    res.cookie('recordame', usuarioALoguearse.email, { maxAge: 60000 });
                }
                return res.redirect('/users/admin');
            } else {
                if (req.body.recordame) {
                    res.cookie('recordame', usuarioALoguearse.email, { maxAge: 60000 });
                }
                return res.redirect('/users/profile');
            }
        } catch (e) {
            return res.status(500).send(e);
        }
    },

    paginaAdmin: (req, res) => res.render('administrator'),

    listarUsuarios: async (req, res) => {
        try {
            const users = await db.User.findAll();
            res.render('listaUsuarios', { usuarios: users });
        } catch (error) {
            res.status(500).send(error);
        }
    },

    detail: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.params.id);
            res.render('detalle-usuario', { id_usuario: req.params.id, usuario_mostrar: user });
        } catch (error) {
            res.status(500).send(error);
        }
    },

    editarVista: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.params.id);
            res.render('edit-user', { old: user });
        } catch (error) {
            res.status(500).send(error);
        }
    },

    saveEdit: async (req, res) => {
        const errors = validationResult(req);
        const id_usuario = req.params.id;
        if (errors.isEmpty()) {
            try {
                await db.User.update({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    type: req.body.type,
                    avatar: req.file.filename
                }, { where: { id: id_usuario } });
                return res.redirect('/users/admin/listar');
            } catch (error) {
                return res.status(500).send(error);
            }
        }
        const old = {
            id: id_usuario,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            type: req.body.type
        };
        res.render('edit-user', { errors: errors.array(), old });
    },

    deleteUser: async (req, res) => {
        try {
            await db.User.destroy({ where: { id: req.params.id } });
            res.redirect('/users/admin/listar');
        } catch (error) {
            res.status(500).send(error);
        }
    },

    perfilUsuario: (req, res) => {
        res.render('perfil', { usuario: res.locals.usuario });
    },

    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/');
    }
};

module.exports = controller;
