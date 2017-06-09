/* -*- mode: js; js-basic-offset: 4; indent-tabs-mode: nil -*- */

const AltTab = imports.ui.altTab;
const Main = imports.ui.main;

let injections = {};


function _finish(timestamp) {
        let appIcon = this._items[this._selectedIndex];
        if (this._currentWindow < 0)
            Main.activateWindow(appIcon.cachedWindows[0], timestamp);
        else
            Main.activateWindow(appIcon.cachedWindows[this._currentWindow], timestamp);

        this.parent();
}

function init(metadata) {
}

function enable() {
   injections._finish = AltTab.AppSwitcherPopup.prototype._finish;
   AltTab.AppSwitcherPopup.prototype._finish = AltTab.AppSwitcherPopup.wrapFunction('_finish', _finish);
}

function disable() {
   let prop;
   for(prop in injections) {
      AltTab.AppSwitcherPopup.prototype[prop] = injections[prop];
   }
}
