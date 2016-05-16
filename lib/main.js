'use babel';

import { CompositeDisposable } from 'atom';

let $     = require('jquery'),
    win32 = process.platform === 'win32',
    exec  = require('child_process').exec;

function pop () {
    Array.prototype.pop.apply(this, arguments);
    return this
};

function push () {
    Array.prototype.push.apply(this, arguments);
    return this
};

function revealActiveFile ( event ) {
    let path;
    let target = $(event.target);
    if (target.is('ul[is="atom-tabs"] *')) {
        if (target.is('div.title')) {
            path = target.data('path');
        } else if (target.is('li[is="tabs-tab"]')) {
            path = target.find('div.title').data('path');
        } else {
            path = target.closest('li[is="tabs-tab"]').find('div.title').data('path');
        }
    } else {
        path = $('.pane.active').attr('data-active-item-path');
    }
    path = path.split('/')::pop()::push('').join('/');
    if (window['atom-debug'] === true) {
        console.log(path);
    }
    if (win32) {
        exec('explorer ' + path);
    } else {
        exec('open ' + path);
    }
}

class MainModel {

    disposables = new CompositeDisposable();

    activate () {
        this.disposables.add(
            atom.commands.add(
                'atom-workspace',
                {
                    'reveal-in-finder:active-file' : revealActiveFile,
                }
            )
        );
    }

    deactivate () {
        this.disposables.dispose();
    }

}

module.exports = new MainModel();
