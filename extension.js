const AltTab = imports.ui.altTab;
const Main = imports.ui.main;
const SwitcherPopup = imports.ui.switcherPopup;

let injections = {};

function _finish(timestamp) {
    let appIcon = this._items[this._selectedIndex];
    if (this._currentWindow < 0)
        Main.activateWindow(appIcon.cachedWindows[0], timestamp);
    else
        Main.activateWindow(appIcon.cachedWindows[this._currentWindow], timestamp);

    SwitcherPopup.SwitcherPopup.prototype._finish.apply(this, [timestamp]);
}

function init(metadata) {}

function enable() {
   injections._finish = AltTab.AppSwitcherPopup.prototype._finish;
   AltTab.AppSwitcherPopup.prototype._finish = _finish;
}

function disable() {
   let prop;
   for(prop in injections) {
      AltTab.AppSwitcherPopup.prototype[prop] = injections[prop];
   }
}
