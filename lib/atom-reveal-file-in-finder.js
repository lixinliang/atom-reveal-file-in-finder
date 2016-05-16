'use babel';

import AtomRevealFileInFinderView from './atom-reveal-file-in-finder-view';
import { CompositeDisposable } from 'atom';

export default {

  atomRevealFileInFinderView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomRevealFileInFinderView = new AtomRevealFileInFinderView(state.atomRevealFileInFinderViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomRevealFileInFinderView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-reveal-file-in-finder:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomRevealFileInFinderView.destroy();
  },

  serialize() {
    return {
      atomRevealFileInFinderViewState: this.atomRevealFileInFinderView.serialize()
    };
  },

  toggle() {
    console.log('AtomRevealFileInFinder was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
