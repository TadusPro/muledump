(function ($, window) {

    var options = window.options;
    var accounts = window.accounts;
    var items = window.items;
    var classes = window.classes;

    // max width of an account box in columns
    var ROW = (setuptools.data.config.rowlength) ? setuptools.data.config.rowlength : 7;
    if (setuptools.data.config.temprowlength != 0) ROW = setuptools.data.config.temprowlength;

    //  we'll prepare this later
    VAULTORDER = []; // This is still used and populated locally in parse

    // dom snippet generators

    function stat(where, type, text) {
        return $('<strong class="stat">').addClass(type).text(text).appendTo(where);
    }

    function maketable(classname, items, layout_columns_arg) {
        var effective_layout_columns;

        // Determine the current row length dynamically
        var rLengthConfig = setuptools.data.config.rowlength || 7;
        var tempRLengthConfig = setuptools.data.config.temprowlength;
        var currentDynamicROW = (tempRLengthConfig != 0 && setuptools.data.config.rowwrap === true) ? tempRLengthConfig : rLengthConfig;

        // Determine the number of columns to use for laying out items
        if (typeof layout_columns_arg === 'undefined' || layout_columns_arg === null) {
            effective_layout_columns = currentDynamicROW; // Default to current dynamic ROW
        } else {
            effective_layout_columns = layout_columns_arg;
        }

        // Override with temprowlength if it's active and smaller (especially if layout_columns_arg was provided)
        if (setuptools.data.config.temprowlength != 0 && setuptools.data.config.rowwrap === true && setuptools.data.config.temprowlength < effective_layout_columns) {
            effective_layout_columns = setuptools.data.config.temprowlength;
        }

        // If there are no items, or the effective columns is 0, return an empty table structure.
        // This prevents trying to calculate width for an empty or zero-column table.
        if (items.length === 0 || effective_layout_columns === 0) {
            return $('<table>').addClass(classname); 
        }
        
        // Ensure at least 1 column if we are proceeding to layout items and items exist
        if (effective_layout_columns < 1) {
            effective_layout_columns = 1;
        }

        var $t = $('<table>').addClass(classname);
        var $row_element = null; 
        for (var i = 0; i < items.length; i++) {
            if (i % effective_layout_columns === 0) {
                if ($row_element) $t.append($row_element);
                $row_element = $('<tr>');
            }
            var itemContent = items[i] ? items[i] : ''; 
            $('<td class="cont">').append(itemContent).appendTo($row_element);
        }
        if ($row_element) $t.append($row_element);

        // Determine the number of columns for CSS width calculation
        // This should be the actual number of columns used, capped by item count if item count is less.
        var css_width_cols = (items.length >= effective_layout_columns) ? effective_layout_columns : items.length;
        
        // css_width_cols should be > 0 here because items.length > 0 and effective_layout_columns was ensured to be > 0.
        // The old `cols = cols || 1;` is no longer needed if the above logic correctly handles 0 items/columns.
        
        $t.css('width', '' + (184 * css_width_cols + 14 * (css_width_cols - 1)) + 'px');
        return $t;
    }

    var NUMCLASSES = 0;
    for (var i in classes) NUMCLASSES++;

    var STARFAME = [20, 500, 1500, 5000, 15000];
    var STARCOLOR = ['#8a98de', '#314ddb', '#c1272d', '#f7931e', '#ffff00', '#ffffff'];
    function addstar($t, d, guid) {
        var r = 0;
        if (!d.Account.Stats || !d.Account.Stats.ClassStats) return;
        var s = d.Account.Stats.ClassStats;
        if (!s.length) s = [s];
        for (var i = 0; i < s.length; i++) {
            var b = +s[i].BestBaseFame || 0;
            for (var j = 0; b >= STARFAME[j] && j < 5; j++);
            r += j;
        }
        //if (r < 1) return;
        var $s = $('<span>').addClass('scont');
        $('<span>').text(r).appendTo($s);
        var $st = $('<span>').text('\u2605').addClass('star');
        $st.css('color', STARCOLOR[Math.floor(r / NUMCLASSES)] || 'lime');
        $st.appendTo($s);

        //  testing server indicator
        if (
            setuptools.app.config.validateFormat(setuptools.data.accounts, 1) === true &&
            typeof setuptools.data.accounts.accounts[guid] === 'object' &&
            setuptools.data.accounts.accounts[guid].testing === true
        ) $('<span>').text('T').css({ margin: '0 0 0 0.2em' }).appendTo($s);

        $s.appendTo($t);
        setuptools.app.ga('send', 'event', {
            eventCategory: 'stars',
            eventAction: r
        });
    }

    function addreloader(mule, target) {
        var button = $('<div class="button reloader">');
        button.text('\u21bb');
        if (mule.data) {
            var updated = new Date(mule.data.query.created);
            button.attr('title', 'last updated: ' + updated.toLocaleString())
        }
        button.on('click.muledump.reloader', function () {
            setuptools.app.mulequeue.task.start(mule.guid);
        });
        button.appendTo(target);
    }

    function addmainbutton(mule, target) {

        //  reload button
        addreloader(mule, target);

    //  one-click login button
        var l = $('<a>').addClass('button ocl');
        l.text('\u21d7');
        l.attr('title', 'Open Account');
        if (setuptools.data.config.mulelogin !== 1) {
            l.attr('href', '#');
            l.css({ display: 'none' });
        } else {

            if (setuptools.data.config.muleloginCopyLinks === 0) {
                l.attr('href', '#');
            } else {
                l.attr('href', setuptools.app.muledump.ocl.mulelink(mule.guid));
            }

        }

        l.appendTo(target);

        l.on('click.mulelogin', function (e) {

            if (setuptools.data.config.muleloginCopyLinks === 0) {

                $(this).attr('href', setuptools.app.muledump.ocl.mulelink(mule.guid));
                setTimeout(function (self) {
                    $(self).attr('href', '#');
                }, setuptools.config.muleloginCopyLinksTtl, this);

            }
            setuptools.app.muledump.ocl.record(mule.guid);
        })
    }

    function addmulemenu(mule) {

        var menu = $('<div class="button muleMenu noselect" title="Mule Menu">');
        menu.html('&#8801;');
        menu.off('click.muledump.mulemenu').on('click.muledump.mulemenu', function (e) {
            setuptools.app.muledump.mulemenu(e, mule.guid, menu, menu, {
                option: 'pos',
                vpx: 26
            });
        });
        if (setuptools.data.config.muleMenu === false) menu.css({ visibility: 'hidden', width: 0, height: 0 });
        menu.appendTo(mule.dom);

        $('div.mule > div.name').off('contextmenu.muledump.mulemenu').on('contextmenu.muledump.mulemenu', function (e) {
            setuptools.app.muledump.mulemenu(e, mule.guid, menu);
        });

        mule.dom.off('contextmenu.muledump.mulemenu').on('contextmenu.muledump.mulemenu', function (e) {
            if (
                ($(e.target)[0].localName === 'img' && $(e.target)[0].className === 'portrait') ||
                ($(e.target)[0].localName === 'a' && $(e.target)[0].className === 'button ocl')
            ) return;
            setuptools.app.muledump.mulemenu(e, mule.guid, menu);
        });

    }

    function arrangevaults(v_chests_data, maxAllowedVaultWidth) { // v_chests_data is an array of vault content strings

        var currentLayoutVaultWidth = maxAllowedVaultWidth;
        if ( !currentLayoutVaultWidth || currentLayoutVaultWidth < 1 ) currentLayoutVaultWidth = 1;
    
        var final_r = []; // This will be the array of items for display, including nulls for spacing
        var num_input_chests = v_chests_data.length;

        if (num_input_chests === 0) { // No chests to display
            return [0, []];
        }
    
        var num_rows = Math.ceil(num_input_chests / currentLayoutVaultWidth);
        var total_grid_cells = num_rows * currentLayoutVaultWidth;
    
        for (var k = 0; k < total_grid_cells; k++) {
            if (k < num_input_chests) {
                final_r.push(v_chests_data[k]); // Actual chest data string
            } else {
                final_r.push(null); // Pad with nulls for empty grid cells
            }
        }
    
        // Determine actual_width by stripping empty columns from the right
        var actual_width = currentLayoutVaultWidth;
        if (num_input_chests > 0) { // Only strip if there are chests
            for (var col = currentLayoutVaultWidth - 1; col >= 0; col--) {
                var column_is_empty = true;
                for (var row_idx = 0; row_idx < num_rows; row_idx++) {
                    var cell_idx = row_idx * currentLayoutVaultWidth + col;
                    if (final_r[cell_idx] !== null) { // Cell has a vault (even if items inside are -1)
                        column_is_empty = false;
                        break;
                    }
                }
                if (column_is_empty) {
                    if (actual_width === col + 1) { // Only decrement if it's the current rightmost
                        actual_width--;
                    }
                } else {
                    break; // Found rightmost non-empty column
                }
            }
        } else {
            actual_width = 0; // No chests, so width is 0
        }
        
        if (num_input_chests > 0 && actual_width === 0) actual_width = 1; // Min 1 col if chests exist but all were stripped (should not happen if stripping logic is correct)
        if (num_input_chests === 0) actual_width = 0;
    
        return [actual_width, final_r];
    }

    //  xml to json
    function xmlToJson(xml) {
        var X = {
            toObj: function(xml) {
                var o = {};
                if (xml.nodeType==1) {   // element node ..
                    if (xml.attributes.length)   // element with attributes  ..
                        for (var i=0; i<xml.attributes.length; i++)
                            o[xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue||"").toString();
                    if (xml.firstChild) { // element has child nodes ..
                        var textChild=0, cdataChild=0, hasElementChild=false;
                        for (var n=xml.firstChild; n; n=n.nextSibling) {
                            if (n.nodeType==1) hasElementChild = true;
                            else if (n.nodeType==3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                            else if (n.nodeType==4) cdataChild++; // cdata section node
                        }
                        if (hasElementChild) {
                            if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                                X.removeWhite(xml);
                                for (var n=xml.firstChild; n; n=n.nextSibling) {
                                    if (n.nodeType == 3)  // text node
                                        o["#text"] = X.escape(n.nodeValue);
                                    else if (n.nodeType == 4)  // cdata node
                                        o["#cdata"] = X.escape(n.nodeValue);
                                    else if (o[n.nodeName]) {  // multiple occurence of element ..
                                        if (o[n.nodeName] instanceof Array)
                                            o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                                        else
                                            o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                                    }
                                    else  // first occurence of element..
                                        o[n.nodeName] = X.toObj(n);
                                }
                            }
                            else { // mixed content
                                if (!xml.attributes.length)
                                    o = X.escape(X.innerXml(xml));
                                else
                                    o["#text"] = X.escape(X.innerXml(xml));
                            }
                        }
                        else if (textChild) { // pure text
                            if (!xml.attributes.length)
                                o = X.escape(X.innerXml(xml));
                            else
                                o["#text"] = X.escape(X.innerXml(xml));
                        }
                        else if (cdataChild) { // cdata
                            if (cdataChild > 1)
                                o = X.escape(X.innerXml(xml));
                            else
                                for (var n=xml.firstChild; n; n=n.nextSibling)
                                    o["#cdata"] = X.escape(n.nodeValue);
                        }
                    }
                    if (!xml.attributes.length && !xml.firstChild) o = null;
                }
                else if (xml.nodeType==9) { // document.node
                    o = X.toObj(xml.documentElement);
                }
                else
                    alert("unhandled node type: " + xml.nodeType);
                return o;
            },
            innerXml: function(node) {
                var s = ""
                if ("innerHTML" in node)
                    s = node.innerHTML;
                else {
                    var asXml = function(n) {
                        var s = "";
                        if (n.nodeType == 1) {
                            s += "<" + n.nodeName;
                            for (var i=0; i<n.attributes.length;i++)
                                s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue||"").toString() + "\"";
                            if (n.firstChild) {
                                s += ">";
                                for (var c=n.firstChild; c; c=c.nextSibling)
                                    s += asXml(c);
                                s += "</"+n.nodeName+">";
                            }
                            else
                                s += "/>";
                        }
                        else if (n.nodeType == 3)
                            s += n.nodeValue;
                        else if (n.nodeType == 4)
                            s += "<![CDATA[" + n.nodeValue + "]]>";
                        return s;
                    };
                    for (var c=node.firstChild; c; c=c.nextSibling)
                        s += asXml(c);
                }
                return s;
            },
            escape: function(txt) {
                return txt.replace(/[\\]/g, "\\\\")
                    .replace(/[\"]/g, '\\"')
                    .replace(/[\n]/g, '\\n')
                    .replace(/[\r]/g, '\\r');
            },

            removeWhite: function(e) {
                e.normalize();
                for (var n = e.firstChild; n; ) {
                    if (n.nodeType == 3) {  // text node
                        if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                            var nxt = n.nextSibling;
                            e.removeChild(n);
                            n = nxt;
                        }
                        else
                            n = n.nextSibling;
                    }
                    else if (n.nodeType == 1) {  // element node
                        X.removeWhite(n);
                        n = n.nextSibling;
                    }
                    else                      // any other node
                        n = n.nextSibling;
                }
                return e;
            }
        };
        if (xml.nodeType == 9) // document node
            xml = xml.documentElement;
        return X.toObj(X.removeWhite(xml));
    }

    // Mule object

    var Mule = function (guid) {

        if (!guid || !(guid in window.accounts)) return;
        var self = this;
        this.guid = guid;
        this.fails = 0;
        this.loaded = false;
        this.fresh = false;
        this.customSorting = false;
        this.shrunk = false;
        this.dom = $('<div class="mule">');
        if (setuptools.app.muledump.totals.config.getKey('accountFilter').indexOf(this.guid) > -1) this.dom.addClass('filteringEnabled');
        this.dom.appendTo($('#stage')).hide();

        //  make sure no secondary account data caches are kept if the main data cache is missing
        if (!localStorage[this.cache_id()]) setuptools.app.muledump.cleanupDataForGuid(this.guid);

        //  prepare totals counter and import cache
        this.totals = new Muledump_TotalsCounter(this.guid, true, function (self) {

            //  we will skip importing if account filter is active and we're not on it
            if (
                setuptools.app.muledump.totals.config.getKey('accountFilter').length === 0 ||
                (typeof self === 'object' && typeof self.guid === 'string' && setuptools.app.muledump.totals.config.getKey('accountFilter').indexOf(self.guid) > -1)
            ) setuptools.tmp.globalTotalsCounter.import(self);

        });

        if (Array.isArray(setuptools.data.options.disabled) === true && setuptools.data.options.disabled.indexOf(this.guid) > -1) {
            this.disabled = true;
            self.dom.toggleClass('disabled', this.disabled);
        }

        //  ctrl+click to disable/enable a mule
        this.dom.on('click.muledump.disableMule', ':not(.item)', function (e) {
            if (setuptools.app.muledump.keys('ctrl', e) === true && setuptools.app.muledump.keys('shift', e) === false) {
                self.disabled = !self.disabled;
                self.dom.toggleClass('disabled', self.disabled);
                if (self.disabled === true && setuptools.app.muledump.totals.config.getKey('disabled').indexOf(self.guid) === -1) setuptools.app.muledump.totals.config.getKey('disabled').push(self.guid);
                if (self.disabled === false && setuptools.app.muledump.totals.config.getKey('disabled').indexOf(self.guid) > -1) setuptools.app.muledump.totals.config.getKey('disabled').splice(setuptools.app.muledump.totals.config.getKey('disabled').indexOf(self.guid), 1);
                setuptools.app.muledump.totals.config.setKey('disabled', setuptools.app.muledump.totals.config.getKey('disabled'));
                setuptools.tmp.globalTotalsCounter.import(self.guid, self.disabled);
                setuptools.app.muledump.totals.updateSecondaryFilter();
                if (setuptools.app.muledump.totals.config.getKey('sortingMode') === 'items') window.init_totals();
                window.update_totals();
                window.update_filter();
                option_updated('totals');
                return;
            }
        });

        //  adjust account filter on shift+click of the mule
        this.dom.on('click.muledump.mule', function (e) {

            if (setuptools.app.muledump.keys('shift', e) === false || setuptools.app.muledump.keys('ctrl', e) === true) return;

            //  add account to account filter
            if (setuptools.app.muledump.totals.config.getKey('accountFilter').indexOf(self.guid) === -1) {

                self.dom.addClass('filteringEnabled');
                setuptools.app.muledump.totals.config.getKey('accountFilter').push(self.guid);
                setuptools.app.muledump.totals.config.setKey('accountFilter', setuptools.app.muledump.totals.config.getKey('accountFilter'));

                if (setuptools.tmp.updateFilterTimer1) clearTimeout(setuptools.tmp.updateFilterTimer1);
                setuptools.tmp.updateFilterTimer1 = setTimeout(function () {
                    setuptools.tmp.globalTotalsCounter.import(self.guid);
                    setuptools.app.muledump.totals.updateSecondaryFilter();
                    if (setuptools.app.muledump.totals.config.getKey('sortingMode') === 'items') window.init_totals();
                    window.update_totals();
                    window.update_filter();
                    option_updated('totals');
                }, 1000);

            }
            //  remove account from account filter
            else {

                function updateFilter() {

                    setuptools.tmp.globalTotalsCounter.import();
                    setuptools.app.muledump.totals.updateSecondaryFilter();
                    if (setuptools.app.muledump.totals.config.getKey('sortingMode') === 'items') window.init_totals();
                    window.update_totals();
                    window.update_filter();
                    option_updated('totals');

                }

                self.dom.removeClass('filteringEnabled');
                setuptools.app.muledump.totals.config.getKey('accountFilter').splice(setuptools.app.muledump.totals.config.getKey('accountFilter').indexOf(self.guid), 1);
                setuptools.app.muledump.totals.config.setKey('accountFilter', setuptools.app.muledump.totals.config.getKey('accountFilter'));
                if (setuptools.tmp.updateFilterTimer2) clearTimeout(setuptools.tmp.updateFilterTimer2);
                setuptools.tmp.updateFilterTimer2 = setTimeout(updateFilter, 1000);

            }

        });
    };

    Mule.prototype.opt = function (name) {
        var o = options[this.guid];
        if (o && name in o) {
            return o[name];
        }
        return options[name];
    };

    Mule.prototype.cache_id = function () {
        return 'muledump:' + this.guid
    };

    Mule.prototype.log = function (s, cl) {
    };

    Mule.prototype.error = function (s, callback, options) {

        if (typeof options !== 'object') options = {};

        //  don't show if errors are turned off
        if (setuptools.data.config.errors === false) return;

        //  build the message
        var self = this;

        //  if this account isn't set to loginOnly and there's no scrollHeight/width, then the dom isn't rendered
        //  in this situation we will forward the error to a lightbox
        if (this.canParse !== true) {
            setuptools.app.assistants.muledumperror(this.guid, s);
            return;
        }

        if (this.errorBar instanceof jQuery) {

            this.errorBar.html(' \
                <div class="flex-container">\
                    <div style="margin-right: 5px;">' + s + '</div> \
                    <div class="setuptools link errorAck menuStyle ack mr0 ml5" title="Dismiss" style="width: auto; height: auto; opacity: 1; border: 0; box-shadow: 0 0 0px 2px #000000;">Dismiss</div>\
                </div>\
            ');
            if (setuptools.tmp.masonry) setuptools.tmp.masonry.layout();

        }

        //  bind the acknowledgement button
        $('div.mule[data-guid="' + this.guid + '"] div.setuptools.link.errorAck').on('click.muledump.errorAck', function () {

            //  remove the bar
            if (setuptools.data.config.animations === 1) {

                //  custom callback on click
                if (typeof callback === 'function') callback();

                if (options.action === 'removeall') {

                    self.dom.fadeOut(600, function () {
                        self.dom.remove();
                    });

                } else $(this).fadeOut(600, function () {
                    this.remove();
                });

                self.errorBar.slideUp(700, function () {
                    self.errorBar.show().text('');
                    if (setuptools.tmp.masonry) setuptools.tmp.masonry.layout();
                });

            } else {

                this.remove();
                self.errorBar.text('');
                if (setuptools.tmp.masonry) setuptools.tmp.masonry.layout();

            }

        });

    };

    //  complete a MuleQueue task
    Mule.prototype.queueFinish = function (guid, status, cache_only, errorMessage) {

        //  return a promise
        if (typeof this.MuleQueue === 'function') {

            this.MuleQueue({
                state: 'finished',
                guid: guid,
                status: status,
                cache_only: cache_only,
                errorMessage: errorMessage
            });

        }

        if (this.deleteAccount === true) setuptools.app.config.userDelete(guid);

    };

    Mule.prototype.createCounter = function (cache, callback) {

        if (typeof cache !== 'boolean') cache = false;
        if (typeof callback !== 'function' && callback !== false) callback = function (self) {

            if (
                setuptools.app.muledump.totals.config.getKey('accountFilter').length === 0 ||
                setuptools.app.muledump.totals.config.getKey('accountFilter').indexOf(self.guid) > -1
            ) {
                setuptools.tmp.globalTotalsCounter.import(self);
            }

        };
        setuptools.app.muledump.cleanupSecondaryCache(this.guid);
        this.totals = new Muledump_TotalsCounter(this.guid, cache, callback);

    };

    Mule.prototype.query = function (ignore_cache, cache_only, freshness, MuleQueue) {
        if (!cache_only) cache_only = false;
        if (!freshness) freshness = false;
        if (setuptools.state.loaded === true && setuptools.app.config.validateFormat(setuptools.data.accounts, 1) === true && setuptools.data.accounts.accounts[this.guid].cacheEnabled === false) {
            ignore_cache = true;
        }
        var self = this;
        if (typeof MuleQueue === 'function') this.MuleQueue = MuleQueue;
        $('#accopts').hide().data('guid', '');

        // read from cache if possible
        if (!ignore_cache || ignore_cache === false) {
            var c = '';
            try {
                c = setuptools.storage.read(this.cache_id(), true);
                c = JSON.parse(c);
            } catch (e) { }
            if (c) {

                //  users can specify a maximum age of cache data before reloading automatically
                var cacheStale = false;
                if (
                    (cache_only !== true || freshness === true) &&
                    setuptools.state.loaded === true &&
                    setuptools.app.config.validateFormat(setuptools.data.accounts, 1) === true &&
                    setuptools.data.config.autoReloadDays > 0 &&
                    setuptools.data.accounts.accounts[this.guid].autoReload === true
                ) {

                    //  let's convert the cache date to utc midnight of the same day
                    var date = new Date(c.query.created);
                    var utcCacheDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0));
                    var cacheDate = utcCacheDate.getTime();
                    var currentDate = Date.now() - setuptools.tmp.timeOffset;
                    var cacheAge = Math.floor(((currentDate - cacheDate) / 1000) / 86400);
                    //setuptools.app.techlog('MuleQueue/CacheInfo age for ' + this.guid + ' is ' + ((currentDate-cacheDate)/1000).toFixed(0));
                    if (cacheAge >= setuptools.data.config.autoReloadDays) {

                        cacheStale = true;
                        window.techlog('MuleQueue/StaleCache found for ' + this.guid, 'string');
                        setuptools.app.ga('send', 'event', {
                            eventCategory: 'detect',
                            eventAction: 'staleCache'
                        });

                    }

                }

                //  users can disable cache data for specific accounts
                if (
                    setuptools.state.loaded === false ||
                    setuptools.app.config.validateFormat(setuptools.data.accounts, 0) === true ||
                    (setuptools.app.config.validateFormat(setuptools.data.accounts, 1) === true && setuptools.data.accounts.accounts[this.guid].cacheEnabled === true)
                ) {

                    //  parse the cache data as-is while we sort out what else to do
                    this.parse(c, true);

                    //  now we will enforce cache freshness
                    if (cacheStale === false) {

                        this.fresh = true;
                        if (cache_only === false) this.queueFinish(this.guid, 'cache');
                        return;

                    }

                }

            }

        }

        if (cache_only === true) return;

        var CR = { guid: this.guid, clientToken: 0 };
        var pass = window.accounts[this.guid] || '';

        //  don't accept blank passwords
        if (pass === '') {
            this.error("Password is empty");
            this.queueFinish(this.guid, 'error', false, 'Password is empty');
            return;
        }

        var platform = this.guid.split(':')[0];
        if (['kongregate', 'steamworks', 'kabam'].indexOf(platform) >= 0) {
            CR.secret = pass
        } else {
            CR.password = pass
        }

        var realmApiURL = setuptools.config.appspotProd;
        if (
            setuptools.state.loaded === true &&
            setuptools.data.accounts.accounts[this.guid].testing === true
        ) realmApiURL = setuptools.config.appspotTesting;

        setuptools.app.uaTiming('mule', 'realmAPICharListGet', 'start', this.guid);
        $.ajax({
            dataType: "text",
            url: realmApiURL + "/account/verify?" + $.param(setuptools.config.realmApiParams),
            method: "POST",
            data: $.param(CR),
            success: function (xml, textStatus, request) {
                window.techlog("Response from api: " + xml, "api");

                var accessToken = xml.match(/<AccessToken>(.+)<\/AccessToken>/);
                if (accessToken) {
                    window.realmAPI(
                        'char/list',
                        { accessToken: accessToken[1] },
                        { url: realmApiURL },
                        function (xhr) {
                            xhr.done(onResponse).fail(onFail)
                        }
                    );
                    //check if response is equal to "<Error>Internal error, please wait 5 minutes to try again!</Error>"
                } else if (
                    xml === "<Error>Internal error, please wait 5 minutes to try again!</Error>" ||
                    xml === "<Error>LOGIN ATTEMPT LIMIT REACHED, please wait 5 minutes before re-trying!</Error>"
                ) {
                    self.queueFinish(self.guid, 'hardRateLimited', 'Request was rate limited by Appspot');
                    window.RateLimitExpiration = Date.now() + 301000;
                    try {
                        localStorage['muledump:ratelimitexpiration'] = 301000
                    } catch (e) { }
                } else if (xml === "<Error>WebChangePasswordDialog.passwordError</Error>") {
                    //  disabled invalid accounts
                    if ([0, 4].indexOf(setuptools.data.config.badaccounts) > -1) {
                        setuptools.app.config.userToggle(self.guid);
                    }

                    //  delete invalid accounts
                    if ([2, 5].indexOf(setuptools.data.config.badaccounts) > -1) {
                        self.deleteAccount = true;
                    }

                    self.queueFinish(self.guid, 'error', false, "passwordError");
                    self.error("passwordError", undefined);
                    setuptools.app.ga('send', 'event', {
                        eventCategory: 'detect',
                        eventAction: 'invalidCredentials'
                    });  
                            


                } else {
                    self.queueFinish(self.guid, 'error', false, xml);
                    self.error(xml);
                    setuptools.app.ga('send', 'event', {
                        eventCategory: 'detect',
                        eventAction: 'accountVerifyError'
                    });
                }
            },
            error: onFail,
            timeout: setuptools.config.realmApiTimeout
        })

        function onFail(xhr) {

            setuptools.app.uaTiming('mule', 'realmAPICharListGet', 'cancel', self.guid);
            self.busy = false;
            self.fails++;
            setuptools.tmp.corsAttempts++;
            if (self.fails < setuptools.config.muledump.corsMaxAttempts) {

                setTimeout(function () { self.query(true); }, 1000);

            } else {

                //  cors error have status code 0
                if (xhr.status === 0) {

                    self.queueFinish(self.guid, 'error', false, 'Could not connect to Appspot (CORS error?)');
                    self.error('There was a problem connecting to ROTMG servers. <a href="#" class="setuptools link cors">Click here</a> for help.');
                    $('.setuptools.link.cors').off('click.setuptools.corsAssistant').on('click.setuptools.corsAssistant', function () {
                        setuptools.app.assistants.cors(true);
                    });

                    //  help the user with potential cors issues (maybe network, or otherwise) on first occurrence
                    setuptools.app.assistants.cors();

                    setuptools.app.ga('send', 'event', {
                        eventCategory: 'detect',
                        eventAction: 'corsError'
                    });

                    return;

                }

                if (xhr.status > 0) {

                    self.queueFinish(self.guid, 'error', false, 'Could not connect to Appspot due to HTTP Error ' + xhr.status);
                    self.error('HTTP Error ' + xhr.status + ' was returned. <a href="' + setuptools.config.httpErrorHelp + '" target="_blank">Click here</a> for help.');
                    setuptools.app.assistants.xhrError(xhr);
                    setuptools.app.ga('send', 'event', {
                        eventCategory: 'detect',
                        eventAction: 'realmApiHttpError',
                        eventLabel: xhr.status.toString()
                    });

                }

            }

        }

        function onResponse(xml, textStatus, request) {

            setuptools.app.uaTiming('mule', 'realmAPICharListGet', 'stop', self.guid);

            //  check for the x-jakcodex-cors response header
            if (setuptools.state.extension === undefined) {

                if (!request.getResponseHeader('X-Jakcodex-CORS')) {

                    setuptools.state.extension = false;
                    setuptools.app.ga('send', 'event', {
                        eventCategory: 'detect',
                        eventAction: 'nonJakcodexCORS'
                    });
                    if (['opera', 'firefox'].indexOf(setuptools.browser) > -1) setuptools.app.muledump.notices.add('New CORS Extension Available', setuptools.app.assistants.jakcodexcors);

                } else {

                    setuptools.state.extension = true;
                    setuptools.app.ga('send', 'event', {
                        eventCategory: 'detect',
                        eventAction: 'isJakcodexCORS',
                        eventLabel: request.getResponseHeader('X-Jakcodex-CORS')
                    });

                }

            }

            self.busy = false;
            parser = new DOMParser();
            date = new Date(Date.now() - ((typeof setuptools.tmp.timeOffset === 'number') ? setuptools.tmp.timeOffset : 0));
            window.techlog("Response from api: " + xml, "api");

            //  check for an error response
            if (error = xml.match(/^<Error\/?>(.*?)<\/?Error>$/)) {

                var errOpts = {};
                if (
                    error[1] === 'Internal error, please wait 5 minutes to try again!' ||
                    error[1] === 'Try again later'
                ) {

                    self.log("Your IP is being rate limited by Deca. Waiting 5 minutes to retry.");
                    self.queueFinish(self.guid, 'rateLimited', 'Request was rate limited by Appspot');

                    //  we'll not send any xhr requests for 1 minutes
                    window.RateLimitExpiration = Date.now() + 61000;

                    try {
                        localStorage['muledump:ratelimitexpiration'] = window.RateLimitExpiration
                    } catch (e) { }

                } else if (
                    error[1] === 'Account is under maintenance' ||
                    error[1] === 'This account has been suspended for breaching Terms of Service. Please contact our Support Desk for more details'
                ) {

                    if (setuptools.state.loaded === true && setuptools.data.accounts.accounts[self.guid].banned === false) {
                        setuptools.data.accounts.accounts[self.guid].banned = true;
                        setuptools.app.config.save('Banned, boo!', true);
                    }

                    //  disabled banned accounts
                    if ([1, 4].indexOf(setuptools.data.config.badaccounts) > -1) setuptools.app.config.userToggle(self.guid);

                    //  delete invalid accounts
                    if ([3, 5].indexOf(setuptools.data.config.badaccounts) > -1) self.deleteAccount = true;

                    self.queueFinish(self.guid, 'error', false, error[1]);
                    self.error("This account is banned - RIP");
                    setuptools.app.ga('send', 'event', {
                        eventCategory: 'detect',
                        eventAction: 'accountBanned'
                    });

                } else if (error[1].match(/^Account in use/)) {

                    self.queueFinish(self.guid, 'error', false, error[1]);
                    var regex = error[1].match(/\(([0-9]*) seconds/);
                    var endTime;
                    if (regex) endTime = new Date(Date.now() + (Number(regex[1]) * 1000)).timeString(false);
                    self.error("Account in use - " + ((endTime) ? 'please try again or wait until " + endTime' : 'Please logout of the account in-game and try again'));
                    setuptools.app.ga('send', 'event', {
                        eventCategory: 'detect',
                        eventAction: 'accountInUse'
                    });

                } else {

                    self.queueFinish(self.guid, 'error', false, error[1]);
                    self.error(error[1]);
                    setuptools.app.ga('send', 'event', {
                        eventCategory: 'detect',
                        eventAction: 'genericServerError'
                    });

                }

                //  no errors, this is a good start
            } else {

                self.queueFinish(self.guid, 'ok');
                if (setuptools.state.loaded === true && setuptools.data.accounts.accounts[self.guid].banned === true) {
                    setuptools.data.accounts.accounts[self.guid].banned = false;
                    setuptools.app.config.save('Unbanned, hooray!');
                }
                if (this.loginOnly === false) self.errorBar.empty();

                // stupid way to fix IDs with #
                // as far as I know theres nowhere else a # can show up
                xml = xml.replaceAll(/(\d+)#\d+/g, "$1");

                //  let's simulate a YQL response
                setuptools.app.uaTiming('mule', 'xmlToJson', 'start', self.guid, false, setuptools.app.uaTimingAggregate);
                var xmlParse = parser.parseFromString(xml, "text/xml");
                var JSONData = xmlToJson(xmlParse);
                setuptools.app.uaTiming('mule', 'xmlToJson', 'stop', self.guid);
                
                JSONData.Chars = {
                    Char: JSONData.Char,
                    Account: JSONData.Account
                }

                delete JSONData.Account;
                delete JSONData.Char;

                data = {
                    query: {
                        created: date.toISOString(),
                        updated: date.toISOString(),
                        results: JSONData
                    },
                    meta: {
                        token: setuptools.config.actoken,
                        version: $.extend(true, {}, setuptools.version)
                    }
                };


                var res = data.query.results;
                window.techlog("Response data for " + self.guid, 'api');
                window.techlog(JSON.stringify(data, null, 5), 'api');

                if (res.Error) {
                    self.error("server error");
                    window.techlog('Server error processing ' + self.guid + ': ' + JSON.stringify(data, null, 5), 'verbose');
                    return;
                }

                function watchProgress(percent) {
                    if (typeof percent !== 'string') {
                        self.error('migration failed');
                        return
                    }
                    if (percent === '100') {
                        self.reload();
                        return
                    }
                    self.log('migration: ' + percent + '%');
                    window.realmAPI('migrate/progress', CR, function (xhr) {
                        xhr.fail(onFail).done(function (data) {
                            date = new Date();
                            data = {
                                query: {
                                    created: date.toISOString(),
                                    updated: date.toISOString(),
                                    results: xmlToJson(parser.parseFromString(data, "text/xml"))
                                }
                            };
                            var res = data && data.query && data.query.results;
                            var per = res.Progress && res.Progress.Percent;
                            watchProgress(per);
                        })
                    })
                }

                if (res.Migrate) {
                    self.log('attempting migration');

                    window.realmAPI('migrate/doMigration', CR, { url: true, type: 'migration' }, function () {
                        watchProgress('0')
                    });
                    return
                }

                if (!res.Chars) return;

                res = res.Chars;

                if ('TOSPopup' in res) {
                    window.realmAPI('account/acceptTOS', CR, { url: true, type: 'tos' })
                }

                if (res.Account && res.Account.IsAgeVerified !== "1") {
                    CR.isAgeVerified = 1;
                    window.realmAPI('account/verifyage', CR, { url: true, type: 'ageVerify' })
                }

                //  reinitialize totals counting for this mule before parsing
                self.createCounter();

                self.parse(data, false);
            }
        }
    };

    Mule.prototype.reload = function () {

        this.fails = 0;
        if (this.overlay) this.overlay.find('.log').empty();
        if (window.RateLimitExpiration >= Date.now()) {
            this.query(false, true);
        } else {
            this.query(true);
        }

    };


    var PROPTAGS = 'ObjectType Level Exp CurrentFame'.split(' ');
    var STATTAGS = 'MaxHitPoints MaxMagicPoints Attack Defense Speed Dexterity HpRegen MpRegen'.split(' ');
    var STATABBR = 'HP MP ATT DEF SPD DEX VIT WIS'.split(' ');
    Mule.prototype.parse = function (data, skipCacheWrite) {

        this.canParse = true;
        if (!skipCacheWrite) skipCacheWrite = false;

        //  calculate some account statistics
        function calculateStatTotals(data, guid) {

            var ign = '';
            var char = [];

            result = {
                TotalFame: 0,
                TotalExp: 0,
                TotalDeathFame: 0,
                TotalDeathExp: 0,
                TotalGifts: 0,
                TotalChars: 0,
                TotalActive: 0,
                TotalChests: 1,
                CacheAge: 0,
                ign: (typeof data.Account === 'object') ? data.Account.Name : ''
            };

            //  determine cache age
            var date = new Date(q.created);
            var cacheDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0));
            result.CacheAge = Math.floor(((Date.now() - cacheDate.getTime()) / 1000) / 86400);

            //  count chests
            var chests = d.Account.Vault ? d.Account.Vault.Chest || ['-1'] : ['-1'];
            if (Array.isArray(chests)) {
                result.TotalChests = chests.length;
            } else if (typeof chests === 'object' || typeof chests === 'string') {
                result.TotalChests = 1;
            }

            //  single character account
            if (
                typeof data.Char === 'object' &&
                typeof data.Char.Account === 'object' &&
                typeof data.Char.Account.Name === 'string'
            ) {

                char.push(data.Char);

            }
            //  multiple character account
            else if (
                typeof data.Char === 'object' &&
                data.Char.length > 0
            ) {

                char = data.Char;

            }

            //  add up the numbers
            for (x = 0; x < char.length; x++) {
                var stats = readstats(char[x].PCStats); //id 20
                result.TotalActive += Number(stats[20]);
            }

            //  let's reduce this as much as possible
            var TimeActive = result.TotalActive / 60;
            var ActiveSuffix = ' hours';
            TimeActive = Math.floor(TimeActive);
            result.TotalActive = TimeActive + ActiveSuffix;

            //  calculate gift stats
            if (typeof data.Account.Gifts === 'string') result.TotalGifts = data.Account.Gifts.split(',').length;

            //  calculate fame and exp stats
            if (typeof data.Char !== 'undefined') {

                //  if the user has multiple characters this will be an array
                if (data.Char.length) {

                    result.TotalChars = data.Char.length;
                    for (var i = 0; i < data.Char.length; i++) {

                        result.TotalFame = Number(result.TotalFame) + Number(data.Char[i].CurrentFame);
                        result.TotalExp = Number(result.TotalExp) + Number(data.Char[i].Exp);
                        result.TotalDeathFame += data.Char[i].muledump.TotalFame || 0;

                    }

                    //  otherwise it is an object
                } else {

                    result.TotalChars = Number(1);
                    result.TotalFame = Number(result.TotalFame) + Number(data.Char.CurrentFame);
                    result.TotalExp = Number(result.TotalExp) + Number(data.Char.Exp);
                    result.TotalDeathFame += data.Char.muledump.TotalFame || 0;

                }

            }

            //  format last gold purchase date
            result.LastGoldPurchase = "N/A";
            if (typeof data.SalesForce.last_purchase_date === 'string') result.LastGoldPurchase = data.SalesForce.last_purchase_date;
            if (result.LastGoldPurchase.indexOf(':') > -1) result.LastGoldPurchase = result.LastGoldPurchase.substr(0, result.LastGoldPurchase.length - 3);

            return result;

        }

        if (this.overlay) this.overlay.hide();

        function parseQueryString(queryString) {
            var query = {};
            var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i].split('=');
                query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
            }
            return query;
        }

        //  start parse timer
        setuptools.app.uaTiming('mule', 'parse', 'start', this.guid, false, setuptools.app.uaTimingAggregate);

        //  shortcut
        var self = this;
        var d = data.query.results.Chars;
        var q = data.query;

        //  store the updated server list if it is present
        if (typeof d.Servers === 'object' && typeof d.Servers.Server === 'object' && typeof d.Servers.Server.push === 'function')
            setuptools.storage.write('ServerList', JSON.stringify(d.Servers.Server, true, 5));

        //  we only need the following information
        //  use this to see full xml contents
        //  console.log(parser.parseFromString(xml, "text/xml"));
        if (!d.OwnedSkins) d.OwnedSkins = [];
        if (!d.SalesForce) d.SalesForce = { lifetime_spend: "0" };
        d = {
            Char: d.Char,
            Account: d.Account || {},
            OwnedSkins: (typeof d.OwnedSkins === 'object' && typeof d.OwnedSkins.push === 'function') ? d.OwnedSkins : (
                (typeof d.OwnedSkins === 'object') ? [] : d.OwnedSkins.split(',')
            ),
            SalesForce: (typeof d.SalesForce === 'object') ? d.SalesForce : (
                (d.SalesForce === "undefined") ? {} : parseQueryString(atob(d.SalesForce))
            )
        };

        //  reset the cache object for storage
        data.query.results.Chars = d;

        this.data = data;
        this.dom.hide().empty();
        this.overlay = null;

        //  moved up here because we're modifying the structure to add sort keys and such

        var carr = [];
        if (d.Char) { // stupid array/object detection
            if (!d.Char.length) carr = [d.Char]; else carr = d.Char;
        }

        // Calculate effectiveROW for this mule's parse operation
        // var baseLayoutROWForMule = ROW; // OLD: Uses potentially stale global ROW
        var rLengthConfig = setuptools.data.config.rowlength || 7;
        var tempRLengthConfig = setuptools.data.config.temprowlength;
        // If rowwrap is enabled and tempRLengthConfig is set (not 0), use it. Otherwise, use rLengthConfig.
        var baseLayoutROWForMule = (setuptools.data.config.rowwrap === true && tempRLengthConfig != 0) ? tempRLengthConfig : rLengthConfig;
        console.log('Base layout ROW for mule (dynamically fetched):', baseLayoutROWForMule);
        var characterCountForMule = carr.length;
        var currentMuleEffectiveROW;

        if (characterCountForMule === 0) {
            currentMuleEffectiveROW = 0; // No characters, so 0 columns for the character table
        } else {
            currentMuleEffectiveROW = baseLayoutROWForMule; // Start with global ROW (e.g. 50 or wrapped value)
            if (characterCountForMule < baseLayoutROWForMule) {
                currentMuleEffectiveROW = characterCountForMule; // Cap by actual char count
            }
            // Ensure at least 1 column if there are characters
            if (currentMuleEffectiveROW < 1) { 
                currentMuleEffectiveROW = 1;
            }
        }
        
        //  add keys for sorting
        for (var i in carr) {

            if (carr.hasOwnProperty(i)) {

                if (typeof carr[i].muledump === 'undefined') carr[i].muledump = {};

                //  add ClassName
                carr[i].muledump.ClassName = (typeof carr[i].ObjectType && Array.isArray(classes[carr[i].ObjectType]) === true) ? classes[carr[i].ObjectType][0] : '????';

                //  record FirstSeen
                setuptools.app.muledump.charSeen(self.guid, carr[i].id);

                //  add TotalFame
                var fame = Number(carr[i].CurrentFame);
                for (var k in bonuses) {

                    if (bonuses.hasOwnProperty(k)) {

                        var b = bonuses[k](readstats(carr[i].PCStats), carr[i], d, fame);
                        if (!b || b === -1) continue;
                        var incr = 0;
                        if (typeof b === 'object') {
                            incr += b.add;
                            b = b.mul;
                        }
                        incr += Math.floor(fame * b);
                        fame += incr;

                    }

                }
                carr[i].muledump.TotalFame = fame;

                //  add ?/8
                carr[i].muledump.MaxedStats = 0;
                for (var t = 0; t < STATTAGS.length; t++) {
                    var s = carr[i][STATTAGS[t]] || 0;
                    var carrcl = classes[carr[i].ObjectType];
                    if (carrcl && parseInt(s) === carrcl[3][t]) {
                        carr[i].muledump.MaxedStats++;
                    }
                }

                //  add value
                //carr[i].muledump.CharValue = setuptools.app.muledump.value.char(this.guid, carr[i].id, true);

            }

        }

        // write cache (even with cacheEnabled===false we'll still write it; just won't use it on reload)
        if (skipCacheWrite !== true) {

            try {
                window.techlog('Muledump/DataCache writing to ' + this.cache_id());
                setuptools.app.uaTiming('mule', 'writeAccountDataCache', 'start', this.guid, false, setuptools.app.uaTimingAggregate);
                setuptools.storage.write(this.cache_id(), data, true);
                setuptools.app.uaTiming('mule', 'writeAccountDataCache', 'stop', this.guid);
            } catch (e) {

            }

        }

        //  add ign to the user account object
        if (
            setuptools.state.loaded === true &&
            setuptools.app.config.validateFormat(setuptools.data.accounts, 1) === true &&
            setuptools.app.config.userExists(this.guid) === true &&
            typeof d.Account === 'object' &&
            typeof d.Account.Name === 'string' &&
            d.Account.Name.length > 0
        ) setuptools.data.accounts.accounts[this.guid].ign = d.Account.Name;

        //  if this account is marked login-only then we are done
        this.loginOnly = false;
        if (
            setuptools.state.loaded === true &&
            setuptools.app.config.validateFormat(setuptools.data.accounts, 1) === true &&
            setuptools.data.accounts.accounts[this.guid].loginOnly === true
        ) this.loginOnly = true;

        var f = false;
        var arr = [];
        var CountingCharList = carr;

        if (this.loginOnly === false) {

            this.dom.attr('data-guid', this.guid);

            //  display guid
            if (this.opt('email')) {
                $('<input type="text" readonly="readonly">').addClass('guid').val(this.guid).appendTo(this.dom);
                $('<br>').appendTo(this.dom);
            }

            //  error bar
            this.errorBar = $('<div>').addClass('errorBar stickynotice').css({ 'font-size': '12px' });
            if (setuptools.data.config.animations < 1) this.errorBar.addClass('AReduced');
            this.errorBar.appendTo(this.dom);

            addmainbutton(this, this.dom);
            addmulemenu(this);

            //  check if email address is verified (but skip steamworks/kongregate/etc)
            if (!('VerifiedEmail' in d.Account) && !this.guid.match(/(?:\:)/)) {
                var $warn = $('<span class="button warn">').text('!!');
                $warn.attr('title', 'email not verified').appendTo(this.dom)
            }

            d.Account = d.Account || {};
            if ((this.opt('accountName') === false)) d.Account.Name = '&nbsp;';
            var $name = $('<div>').addClass('name').html(d.Account.Name || '(no name)');
            addstar(this.dom, d, this.guid);

            //  click name to access account options
            $name.on('click.muledump.muleAccountName', function (e) {
                if (e.target !== this) return;
                setuptools.lightbox.menu.context.close();
                if (setuptools.app.muledump.keys('ctrl', e) === true || setuptools.app.muledump.keys('shift', e) === true) return;
                var $ao = $('#accopts');
                $ao.css({
                    left: e.pageX - 5 + 'px',
                    top: e.pageY - 5 + 'px'
                });
                window.updaccopts(self.guid);
                $ao.css({
                    'display': 'block',
                    'visibility': 'visible'
                });
            });
            $name.appendTo(this.dom);

            if (!this.opt('shrink')) {

                //  display account info
                if (this.opt('accountinfo')) {
                    stats = calculateStatTotals(this.data.query.results.Chars, this.guid);
                    $('<div class="stats">\
                        <div class="flex-container"><div>Account Data Cache Age</div><div>' + stats.CacheAge + ' ' + ((stats.CacheAge === 1) ? 'day' : 'days') + '</div></div> \
                        <div class="flex-container"><div>Account Fame</div><div>' + this.data.query.results.Chars.Account.Stats.Fame + '</div></div> \
                        <div class="flex-container"><div>All Time Account Fame</div><div>' + this.data.query.results.Chars.Account.Stats.TotalFame + '</div></div> \
                        <div class="flex-container"><div>Account Gold</div><div>' + this.data.query.results.Chars.Account.Credits + '</div></div> \
                        <div class="flex-container"><div>Gift Items</div><div>' + stats.TotalGifts + '</div></div> \
                        <div class="flex-container"><div>Last Gold Purchase</div><div>' + stats.LastGoldPurchase + '</div></div> \
                        <div class="flex-container"><div>Total Char Exp</div><div>' + stats.TotalExp + '</div></div> \
                        <div class="flex-container"><div>Total Char Fame</div><div>' + stats.TotalFame + '</div></div> \
                        <div class="flex-container"><div>Total Death Fame</div><div>' + stats.TotalDeathFame + '</div></div> \
                        <div class="flex-container"><div>Total Characters</div><div>' + stats.TotalChars + '</div></div> \
                        <div class="flex-container"><div>Total Character Slots</div><div>' + ((data.query.results.other) ? data.query.results.other.maxCharNum : 'N/A') + '</div></div> \
                        <div class="flex-container"><div>Total Lifetime Characters</div><div>' + ((data.query.results.other) ? (data.query.results.other.nextCharId - 1) : 'N/A') + '</div></div> \
                        <div class="flex-container"><div>Total Skins Unlocked</div><div>' + (this.data.query.results.Chars.OwnedSkins.length + Object.keys(classes).length) + ' of ' + Object.keys(skins).length + '</div></div>\
                        <div class="flex-container"><div>Total Time Active</div><div>' + stats.TotalActive + '</div></div> \
                        <!-- removed for now due to inaccurate data coming from deca -- <div class="flex-container"><div>Lifetime Gold Purchased</div><div>' + this.data.query.results.Chars.SalesForce.lifetime_spend + '</div></div>--> \
                        <div class="flex-container"><div>Total Unlocked Chests</div><div>' + stats.TotalChests + '</div></div> \
                </div>').appendTo(this.dom);
                }

                //  for future use - skins owned by percentage to append total skins unlocked
                //' / ' + ( ((this.data.query.results.Chars.OwnedSkins.length/Object.keys(skins).length)*100).toFixed(0) ) + '%</div></div> \

                //  check for gift chests bug
                var TotalGifts = 0;
                if (typeof d.Account.Gifts === 'string') TotalGifts = d.Account.Gifts.split(',').length;
                if (TotalGifts >= setuptools.config.giftsWarningThreshold) {

                    //  check if we should alert the user
                    if (
                        setuptools.app.config.determineFormat(setuptools.data.accounts) === 0 ||
                        setuptools.data.accounts.accounts[this.guid].giftsBugAck !== true
                    ) {

                        this.error('Warning: Account is nearing the <a href="' + setuptools.config.giftChestsBugHelp + '" class="rateLimited nopulse" target="_blank">gift chests bug</a>!', function () {

                            if (setuptools.app.config.determineFormat(setuptools.data.accounts) === 1) {

                                setuptools.data.accounts.accounts[self.guid].giftsBugAck = true;
                                setuptools.app.config.save('Gift Chests Bug Ack');

                            }

                        });

                    }

                }
                //  reset the acknowledgement if the issue isn't detected
                else if (
                    setuptools.state.loaded === true &&
                    setuptools.app.config.determineFormat(setuptools.data.accounts) === 1 &&
                    setuptools.data.accounts.accounts[self.guid].giftsBugAck === true
                ) setuptools.data.accounts.accounts[self.guid].giftsBugAck = false;

            }

            //  sort the character list
            if (setuptools.data.config.debugging === true) setuptools.app.uaTiming('mule', 'parseCharacterSorting', 'start', this.guid, false, setuptools.app.uaTimingAggregate);

            //  if we had been customSorting we need to regenerate the totals
            if (this.customSorting === true && this.opt('chsort') !== '100') {

                this.createCounter();
                this.redoTotals = true;
                this.customSorting = false;

            }

            //  custom
            if (this.opt('chsort') === '100') {

                //  clean and read the active char sorting list
                if (skipCacheWrite !== true) setuptools.app.muledump.charsort.clean(this.guid);
                var CharList = setuptools.app.muledump.charsort.read(this.guid, true);
                if (Array.isArray(CharList) && CharList.length > 0) {

                    CharList = setuptools.app.muledump.charsort.disabled(this.guid, setuptools.app.muledump.charsort.read(this.guid), CharList);
                    this.createCounter();
                    this.redoTotals = true;
                    this.customSorting = true;

                    carr = CharList;
                    if (setuptools.data.options.totalsGlobal === false) CountingCharList = CharList;

                } else {

                    //  reset the active list
                    if (Array.isArray(CharList) && CharList.length === 0) setuptools.app.muledump.charsort.active(this.guid);

                    //  use default
                    carr.sort(function (a, b) {
                        return a.id - b.id
                    });

                }

                //  character value
            } else if (this.opt('chsort') === '7') {
                carr.sort(function (a, b) {
                    return b.muledump.CharValue - a.muledump.CharValue;
                });
                //  active time
            } else if (this.opt('chsort') === '6') {
                carr.sort(function (a, b) {
                    return b.muledump.MaxedStats - a.muledump.MaxedStats;
                })
            } else if (this.opt('chsort') === '5') {

                carr.sort(function (a, b) {

                    var statsA = readstats(a.PCStats);
                    var statsB = readstats(b.PCStats);
                    return Number(statsB[20]) - Number(statsA[20])

                });

                //  class, by fame
            } else if (this.opt('chsort') === '4') {

                //  sort alphabetically and by current fame
                carr.sort(function (a, b) {
                    if (a.muledump.ClassName < b.muledump.ClassName) return -1;
                    if (a.muledump.ClassName > b.muledump.ClassName) return 1;
                    if (a.muledump.ClassName === b.muledump.ClassName) {
                        return b.CurrentFame - a.CurrentFame;
                    }
                    return 0;
                });

                //  base exp
            } else if (this.opt('chsort') === '3') {

                carr.sort(function (a, b) {
                    return b.Exp - a.Exp
                });

                //  total fame
            } else if (this.opt('chsort') === '2') {

                carr.sort(function (a, b) {
                    return b.muledump.TotalFame - a.muledump.TotalFame
                });

                //  base fame
            } else if (this.opt('chsort') === '1') {

                carr.sort(function (a, b) {
                    return b.CurrentFame - a.CurrentFame
                });

                //  id (default)
            } else {
                carr.sort(function (a, b) {
                    return a.id - b.id
                });
            }

            if (setuptools.data.config.debugging === true) setuptools.app.uaTiming('mule', 'parseCharacterSorting', 'stop', this.guid);

        }

        if (this.opt('classstats') && d.Account && d.Account.Stats && d.Account.Stats.ClassStats && d.Account.Stats.ClassStats.length > 0) {

            var cswidth = setuptools.data.config.rowlength * 220;
            var cshtml = ' \
                <div class="classstats flex-container noFlexAutoWidth" style="flex-wrap: wrap; justify-content: flex-start; width: ' + cswidth + 'px;">\
            ';
            var cslist = {};
            d.Account.Stats.ClassStats.forEach(function (stats, index) {
                cslist[skins[+stats.objectType][0]] = index;
            });

            var csmap = [];
            Object.keys(cslist).sort(function (a, b) {
                if (a < b) return -1;
                if (a === b) return 0;
                if (a > b) return 1;
            }).forEach(function (csname) {
                csmap.push(cslist[csname]);
            });

            csmap.forEach(function (csid) {
                var stats = d.Account.Stats.ClassStats[csid];
                cshtml += ' \
                    <div class="class flex-container noFlexAutoWidth ml5 mr5 mb5 mt5 menuStyle nohover" style="flex-wrap: wrap; justify-content: space-between;"> \
                        <div class="className flex-container noFlexAutoWidth" style="width: 41%;">' + skins[+stats.objectType][0] + '</div>\
                        <div class="flex-container noFlexAutoWidth" style="width: 59%; flex-wrap: wrap;">\
                            <div class="cell bestLevel flex-container" style="justify-content: space-between; padding-left: 4px;"> \
                                <div>Best Level</div>\
                                <div>' + stats.BestLevel + '</div>\
                            </div>\
                            <div class="cell bestFame flex-container" style="justify-content: space-between; padding-left: 4px;"> \
                                <div>Best Fame</div>\
                                <div>' + stats.BestFame + '</div>\
                            </div>\
                        </div>\
                    </div>\
                ';
            });
            cshtml += ' \
                </div>\
            ';
            $('<div class="classstats flex-container">').html(cshtml).appendTo(this.dom);

        }

        //  main character loop
        if (typeof setuptools.tmp.wawawaTimers === 'undefined') setuptools.tmp.wawawaTimers = {};
        if (typeof setuptools.tmp.mainCharLoopTimers === 'undefined') setuptools.tmp.mainCharLoopTimers = {};
        setuptools.tmp.wawawaTimers[this.guid] = 0;
        setuptools.tmp.mainCharLoopTimers[this.guid] = 0;

        //  loop chars for counting
        if (this.totals.cache === false) {

            for (var z = 0; z < CountingCharList.length; z++) {

                if (typeof CountingCharList[z] !== 'object') CountingCharList[z] = {};
                var eqc = (CountingCharList[z].Equipment || '').split(',');
                for (var tec = 0; tec < 4; tec++) this.totals.count(eqc[tec] || "-1", 'equipment');
                for (var tic = 4; tic < 12; tic++) this.totals.count(eqc[tic] || "-1", 'inv');
                if (+CountingCharList[z].BackpackSlots >= 8) for (var tbc = 12; tbc < ((eqc.length < 20) ? 20 : eqc.length); tbc++) this.totals.count(eqc[tbc] || "-1", 'backpack');


            }

        }

        //  loop chars for display
        for (var i = 0; i < carr.length; i++) {

            setuptools.app.uaTiming('mule', 'mainCharLoopTimer', 'start', this.guid);
            var c = carr[i], $c = $('<div class="char">');
            if (!c) continue;
            var cl = classes[c.ObjectType];
            //if (!cl) continue;
            if (this.loginOnly === false && !this.opt('shrink') && this.opt('chdesc')) {

                f = true;

                //  draw character portrait and description
                setuptools.app.muledump.drawPortrait(c, $c);

            }

            if (this.loginOnly === false && !this.opt('shrink') && this.opt('stats')) {
                f = true;
                var $stats = $('<table class="stats">');
                

                //check for exaltations
                var exaltations = null;
                if (this.data.query.results.PowerUpStats && this.data.query.results.PowerUpStats.ClassStats) {
                    if (!Array.isArray(this.data.query.results.PowerUpStats.ClassStats)) this.data.query.results.PowerUpStats.ClassStats = [this.data.query.results.PowerUpStats.ClassStats];
                    const hasExalts = this.data.query.results.PowerUpStats.ClassStats.find(stats => stats.class === c.ObjectType);
                    if (hasExalts) {
                        exaltations = hasExalts["#text"].split(",").map((stat) => {
                            const parsedStat = parseInt(stat);
                            let exaltValue;
                            switch (true) {
                                case (parsedStat < 5):
                                    exaltValue = 0;
                                    break;
                                case (parsedStat < 15):
                                    exaltValue = 1;
                                    break;
                                case (parsedStat < 30):
                                    exaltValue = 2;
                                    break;
                                case (parsedStat < 50):
                                    exaltValue = 3;
                                    break;
                                case (parsedStat < 75):
                                    exaltValue = 4;
                                    break;
                                default:
                                    exaltValue = 5;
                            }
                            return exaltValue;
                        });

                        // Change order of exaltations and multiply hp/mp by 5
                        exaltations = [
                            exaltations[7] * 5,
                            exaltations[6] * 5,
                            exaltations[5],
                            exaltations[4],
                            exaltations[1],
                            exaltations[0],
                            exaltations[2],
                            exaltations[3]
                        ];
                    }
                }



                for (var t = 0; t < STATTAGS.length; t++) {
                    var $row;
                    if (t % 2 === 0) $row = $('<tr>');
                    $('<td class="sname">').text(STATABBR[t]).appendTo($row);
                    var $s = $('<td>');
                    var s = +c[STATTAGS[t]] || 0;
                    var stt = this.opt('sttype');
                    if (!cl) {
                    } else if (stt === 'base') {
                        // Only show exaltations if the base stat is selected
                        stat($s, 'base', s).toggleClass('maxed', s === cl[3][t]);
                        if (exaltations && exaltations[t] !== 0) $('<strong class="exalt">').text(" +" + exaltations[t]).appendTo($s);
                    } else if (stt === 'avg') {
                        var avgd = s - Math.floor(cl[1][t] + (cl[2][t] - cl[1][t]) * (+c.Level - 1) / 19);
                        stat($s, 'avg', (avgd > 0 ? '+' : '') + avgd + (exaltations && exaltations[t] !== 0 ? exaltations[t] : ''))
                            .addClass(avgd > 0 ? 'good' : (avgd < 0 ? 'bad' : ''))
                            .toggleClass('very', Math.abs(avgd) > 14);
                    } else if (stt === 'max') {
                        var l2m = cl[3][t] - s;
                        if (t < 2) l2m = l2m + ' (' + Math.ceil(l2m / 5) + ')';
                        stat($s, 'max', l2m + (exaltations && exaltations[t] !== 0 ? exaltations[t] : ''))
                            .toggleClass('maxed', cl[3][t] <= s);
                        if (exaltations && exaltations[t] !== 0) $('<strong class="exalt">').text(" +" + exaltations[t]).appendTo($s);
                        
                    } else if (stt === 'comb') {
                        if (s < cl[3][t]) {
                            var avgd = s - Math.floor(cl[1][t] + (cl[2][t] - cl[1][t]) * (+c.Level - 1) / 19);
                            stat($s, 'small', s + ' / ' + cl[3][t] + (exaltations && exaltations[t] !== 0 ? exaltations[t] : ''))
                                .addClass(avgd > 0 ? 'good' : (avgd < 0 ? 'bad' : ''))
                                .toggleClass('very', Math.abs(avgd) > 14)
                                .attr('title', avgd + ' from avg');
                            if (exaltations && exaltations[t] !== 0) $('<strong class="exalt">').text(" +" + exaltations[t]).appendTo($s);
                        
                        } else {
                            stat($s, 'maxed', s);
                            if (exaltations && exaltations[t] !== 0) $('<strong class="exalt">').text(" +" + exaltations[t]).appendTo($s);
                        }
                    }
                    $s.appendTo($row);
                    if (t % 2) $row.appendTo($stats);
                }
                

                $c.append($stats);
            }

            // items
            var eq = (c.Equipment || '').split(',');
            var tcount = [];
            var dobp = this.opt('backpack') && (c.BackpackSlots == 8 || c.BackpackSlots == 16);

            if (this.opt('equipment') || this.opt('inv') || dobp) {

                f = true;
                if (this.loginOnly === false && !this.opt('shrink')) var itc = $('<div>').addClass('items');
                if (this.opt('equipment')) {
                    tcount = tcount.concat(eq.slice(0, 4));
                    if (this.loginOnly === false && !this.opt('shrink')) itc.append(setuptools.app.muledump.item_listing(eq.slice(0, 4), 'equipment', c.ObjectType));
                }
                if (this.opt('inv')) {
                    tcount = tcount.concat(eq.slice(4, 12));
                    if (this.loginOnly === false && !this.opt('shrink')) itc.append(setuptools.app.muledump.item_listing(eq.slice(4, 12), 'inv'));
                }
                if (dobp) {
                    tcount = tcount.concat(eq.slice(12, eq.length));
                    if (this.loginOnly === false && !this.opt('shrink')) itc.append(setuptools.app.muledump.item_listing(eq.slice(12, eq.length), 'backpack'));
                }

                if (this.loginOnly === false && !this.opt('shrink')) itc.appendTo($c);

            }

            var hpmp = c.EquipQS;
            var items = ( typeof hpmp === 'string' ) ? hpmp.split(',') : undefined;
            if ( Array.isArray(items) === true ) {
                // quickslot counting for totals
                if ( this.totals.cache === false ) {
                    for ( var j = 0; j < items.length; j++ ) {
                        var item = items[j].split("|");
                        var qty = +(item[1] || 1);
                        if ( item[0] !== "-1" ) {
                            this.totals.count(item[0], "hpmp", qty);
                        }
                    }
                }

                // quickslot display
                if ( this.loginOnly === false && !this.opt('shrink') && this.opt('hpmp') ) {
                    var quickslotsCount = (+c.Has3Quickslots ? 3 : 2);
                    while ( items.length < quickslotsCount ) {
                        items.push("-1|0");
                    }
                    var r = $('<div class="itemsc hpmp noselect">');
                    for ( var j = 0; j < items.length; j++ ) {
                        var item = items[j].split("|");
                        var qty = +(item[1] || 1) || undefined;
                        setuptools.app.muledump.item(item[0], undefined, qty, undefined).appendTo(r);
                    }
                    $('<div class="items">').append(r).appendTo($c);
                }
            }
            
            //  keeping this separate from the wawawa code
            if (this.loginOnly === false && !this.opt('shrink') && this.opt('wawawa')) {

                if (setuptools.tmp.gaSentWawawa !== true) {

                    setuptools.tmp.gaSentWawawa = true;
                    setuptools.app.ga('send', 'event', {
                        eventCategory: 'options',
                        eventAction: 'wawawa'
                    });

                }

            }

            /*
            //  Wawawa Option
            //  https://github.com/wawawawawawawa/muledump
            //  https://github.com/jakcodex/muledump/pull/19
            //  Thank you, Wawawa!
            */
            /////////////////////////
            // WAWAWA PART
            if (this.loginOnly === false && !this.opt('shrink') && this.opt('wawawa')) {

                if (setuptools.data.config.debugging === true) setuptools.app.uaTiming('mule', 'parseWawawa', 'start', this.guid);
                function round(value, decimals) {
                    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
                }

                function apply_bonus(value) {
                    for (var k in bonuses) {
                        var b = bonuses[k](st, c, d, value);
                        if (!b) continue;
                        var incr = 0;
                        if (typeof b == 'object') {
                            incr += b.add;
                            b = b.mul;
                        }
                        incr += Math.floor(value * b);
                        value += incr;
                    }
                    return value;
                }

                var st = readstats(c.PCStats); 			//FAME
                var iTotalFame = +c.CurrentFame;
                var fame = +c.CurrentFame;
                var fbonus = [];
                fbonus.push('Base Fame : ' + iTotalFame.toLocaleString() + '\n\n');
                for (var k in bonuses) {
                    var b = bonuses[k](st, c, d, iTotalFame);
                    if (!b) continue;
                    var incr = 0;
                    if (typeof b == 'object') {
                        incr += b.add;
                        b = b.mul;
                    }
                    incr += Math.floor(iTotalFame * b);
                    iTotalFame += incr;
                    fbonus.push(k + ' : +' + incr.toLocaleString() + ' Fame\n');
                }
                fbonus.push('\nTotal Fame : ' + iTotalFame.toLocaleString() + ' Fame' + '\n\nFirst Born : ' + d.Account.Stats.BestCharFame);

                var boost = round((iTotalFame / fame), 2)
                var lower = 0;
                var upper = d.Account.Stats.BestCharFame;
                if (upper - lower == 1) {
                    upper = +c.CurrentFame + 1;
                }
                while (upper - lower > 1) {
                    var middle = lower + Math.floor((upper - lower) / 2);
                    var current = apply_bonus(middle);
                    if (current >= d.Account.Stats.BestCharFame) {
                        upper = middle;
                    } else {
                        lower = middle;
                    }
                }
                if (apply_bonus(+c.CurrentFame) < d.Account.Stats.BestCharFame) {
                    var upperleft = upper - +c.CurrentFame;
                    fbonus.push('\nBase Fame Needed for First Born : ' + lower.toLocaleString() + ' (' + upperleft.toLocaleString() + ' Base Fame Left)');
                }

                if (iTotalFame > 0) {
                    if (iTotalFame > 400) {
                        if (iTotalFame > 2000) {
                            $('<div>').append($('<div style="color:gold;font-weight:bold">').text(' Total Fame = ' + iTotalFame.toLocaleString() + ' Fame ').attr('title', fbonus.join('')))
                                .appendTo($c);
                        }
                        else {
                            $('<div>').append($('<div style="color:#39ef4e;font-weight:bold">').text(' Total Fame = ' + iTotalFame.toLocaleString() + ' Fame ').attr('title', fbonus.join('')))
                                .appendTo($c);
                        }
                    }
                    else {
                        $('<div>').append($('<div style="color:#99f7a4;font-weight:bold">').text(' Total Fame = ' + iTotalFame.toLocaleString() + ' Fame ').attr('title', fbonus.join('')))
                            .appendTo($c);
                    }
                }
                else {
                    $('<div>').append($('<div style="color:red;font-weight:bold">').text(' Total Fame = ' + iTotalFame.toLocaleString() + ' Fame ').attr('title', fbonus.join('')))
                        .appendTo($c);
                }

                var v = st[20], ATime = [];			//TIME
                var FPM = round(fame / v, 2) + ' Base Fame/Minute\n' + round(iTotalFame / v, 2) + ' Total Fame/Minute\nFame Boost : ' + round((iTotalFame / fame) * 100, 2) + ' %';
                var divs = { 'y': 525600, 'm': 43200, 'd': 1440, 'h': 60, 'min': 1 };
                for (var s in divs) {
                    if (ATime.length > 4) break;
                    var t = Math.floor(v / divs[s]);
                    if (t) ATime.push(t + s);
                    v %= divs[s];
                }

                if (st[20] > 60) {
                    $('<div>').append($('<div style="color:gold;font-weight:bold">').text(' Active Time = ' + ATime.join(' ')).attr('title', FPM))
                        .appendTo($c);
                }
                else if (st[20] > 30) {
                    $('<div>').append($('<div style="color:#39ef4e;font-weight:bold">').text(' Active Time = ' + ATime.join(' ')).attr('title', FPM))
                        .appendTo($c);
                }
                else if (st[20] > 10) {
                    $('<div>').append($('<div style="color:#99f7a4;font-weight:bold">').text(' Active Time = ' + ATime.join(' ')).attr('title', FPM))
                        .appendTo($c);
                }
                else {
                    if (ATime == "") {
                        $('<div>').append($('<div style="color:red;font-weight:bold">').text(' Active Time < 1 min ').attr('title', FPM))
                            .appendTo($c);
                    }
                    else {
                        $('<div>').append($('<div style="color:red;font-weight:bold">').text(' Active Time = ' + ATime.join(' ')).attr('title', FPM))
                            .appendTo($c);
                    }
                }

                var TilesDone = st[3].toLocaleString();			// TILES
                var TPM = round(st[3] / st[20], 0);
                var TilesData = [];
                var TilesLeft = 4e6 - st[3] + 1;
                if (TilesLeft <= 0) {
                    TilesLeft = '';
                    TilesData.push(TPM.toLocaleString() + ' Tiles/Minute');
                }
                if (TilesLeft > 0) {
                    var vCart = round((4e6 - st[3] + 1) / round(st[3] / st[20], 0), 0), TilesTime = [];
                    for (var sCart in divs) {
                        if (TilesTime.length > 4) break;
                        var tCart = Math.floor(vCart / divs[sCart]);
                        if (tCart) TilesTime.push(tCart + sCart);
                        vCart %= divs[sCart];
                    }
                    if (TilesLeft > 3e6) {
                        var TilesLeftExpl = TilesLeft - 3e6;
                        var vExpl = round((1e6 - st[3] + 1) / round(st[3] / st[20], 0), 0), TilesTimeExpl = [];
                        for (var sExpl in divs) {
                            if (TilesTimeExpl.length > 4) break;
                            var tExpl = Math.floor(vExpl / divs[sExpl]);
                            if (tExpl) TilesTimeExpl.push(tExpl + sExpl);
                            vExpl %= divs[sExpl];
                        }
                        TilesLeft = 'Explorer : ' + TilesLeftExpl.toLocaleString() + ' Tiles Left\nAverage Time Left : ' + TilesTimeExpl.join(' ') + ' Left\nCartographer : ' + TilesLeft.toLocaleString() + ' Tiles Left\nAverage Time Left : ' + TilesTime.join(' ') + ' Left';
                    }
                    else {
                        TilesLeft = 'Cartographer : ' + TilesLeft.toLocaleString() + ' Tiles Left\nAverage Time Left : ' + TilesTime.join(' ') + ' Left';
                    }
                    TilesData.push(TPM.toLocaleString() + ' Tiles/Minute\n\n' + TilesLeft);
                }

                if (st[3] > 0) {
                    if (st[3] > 1e6) {
                        if (st[3] > 4e6) {
                            $('<div>').append($('<div style="color:gold;font-weight:bold">').text(' Tiles = ' + TilesDone).attr('title', TilesData))
                                .appendTo($c);
                        }
                        else {
                            $('<div>').append($('<div style="color:#39ef4e;font-weight:bold">').text(' Tiles = ' + TilesDone).attr('title', TilesData))
                                .appendTo($c);
                        }
                    }
                    else {
                        $('<div>').append($('<div style="color:#99f7a4;font-weight:bold">').text(' Tiles = ' + TilesDone).attr('title', TilesData))
                            .appendTo($c);
                    }
                }
                else {
                    $('<div>').append($('<div style="color:red;font-weight:bold">').text(' Tiles = ' + TilesDone).attr('title', TilesData))
                        .appendTo($c);
                }

                var QuestName = {			// TUNNEL RAT
                    13: 'Pirate Cave',
                    14: 'Undead Lair',
                    15: 'Abyss Of Demons',
                    16: 'Snake Pit',
                    17: 'Spider Den',
                    18: 'Sprite World',
                    21: 'Tomb',
                    22: 'Trench',
                    23: 'Jungle',
                    24: 'Manor',
                    25: 'Forest Maze',
                    26: 'Lair Of Draconis',
                    28: 'Haunted Cemetary',
                    29: 'Cave Of A Thousand Treasures',
                    30: 'Mad Lab',
                    31: 'Davy Jones Locker',
                    34: 'Ice Cave',
                    35: 'Deadwater Docks',
                    36: 'Crawling Depths',
                    37: 'Woodland Labyrinth',
                    38: 'Battle for Nexus',
                    39: 'Shatters',
                    40: 'Belladonnas Garden',
                    41: 'Puppet Masters Theatre',
                    42: 'Sewers',
                    43: 'Hive',
                    44: 'Mountain Temple',
                    45: 'Nest',
                    46: 'Lair Of Draconis (Hard)',
                    47: 'Lost Halls',
                    48: 'Cultist Hideout',
                    49: 'Void',
                    50: 'Puppet Master Encore',
                    51: 'Lair Of Shaitan',
                    52: 'Parasite Chambers',
                    53: 'Magic Woods',
                    54: 'Cnidarian Reefs',
                    55: 'Secluded Thickets',
                    56: 'Cursed Libraries'
                };

                var QuestName2 = {
                    25: 'Forest Maze',
                    26: 'Lair Of Draconis',
                    28: 'Haunted Cemetary',
                    29: 'Cave Of A Thousand Treasures',
                    30: 'Mad Lab',
                    31: 'Davy Jones Locker',
                    34: 'Ice Cave',
                    35: 'Deadwater Docks',
                    36: 'Crawling Depths',
                    37: 'Woodland Labyrinth',
                    38: 'Battle for Nexus',
                    39: 'Shatters',
                    40: 'Belladonnas Garden',
                    41: 'Puppet Masters Theatre',
                    42: 'Sewers',
                    43: 'Hive',
                    44: 'Mountain Temple',
                    45: 'Nest',
                    46: 'Lair Of Draconis (Hard)',
                    47: 'Lost Halls',
                    48: 'Cultist Hideout',
                    49: 'Void',
                    50: 'Puppet Master Encore',
                    51: 'Lair Of Shaitan',
                    52: 'Parasite Chambers',
                    53: 'Magic Woods',
                    54: 'Cnidarian Reefs',
                    55: 'Secluded Thickets',
                    56: 'Cursed Libraries'
                };

                var QuestList = [];
                var QuestMiss = [];
                for (m in QuestName) {
                    if (st[m] != 0) {
                        if (QuestList == '') {
                            QuestList.push(st[m].toLocaleString() + ' ' + QuestName[m]);
                        }
                        else {
                            QuestList.push('\n' + st[m].toLocaleString() + ' ' + QuestName[m]);
                        }
                    }
                    else {
                        if (QuestMiss == '') {
                            QuestMiss.push(st[m] + ' ' + QuestName[m]);
                        }
                        else {
                            QuestMiss.push('\n' + st[m] + ' ' + QuestName[m]);
                        }
                    }
                }
                var TratQuest = [];
                var TratQuest2 = [];
                for (m in shortdungeonnames) {
                    if (st[m] == 0) {
                        if (TratQuest == '') {
                            TratQuest.push(st[m] + ' ' + shortdungeonnames[m]);
                            TratQuest2.push(st[m] + ' ' + shortdungeonnames[m]);
                        }
                        else {
                            TratQuest.push('\n' + st[m] + ' ' + shortdungeonnames[m]);
                            TratQuest2.push('\n' + st[m] + ' ' + shortdungeonnames[m]);
                        }
                    }
                }
                for (m in QuestName2) {
                    if (m == 25) {
                        if (st[m] == 0) {
                            TratQuest2.push('\n\n' + st[m] + ' ' + QuestName2[m]);
                        }
                        else {
                            TratQuest2.push('\n');
                        }
                    }
                    else {
                        TratQuest2.push('\n' + st[m] + ' ' + QuestName2[m]);
                    }
                }

                if (TratQuest.length == 0) {
                    if (QuestMiss.length == 0) {
                        $('<div>').append($('<div style="color:gold;font-weight:bold">').text(' Tunnel Rat = Complete').attr('title', QuestMiss.join(' ')))
                            .appendTo($c);
                    }
                    else {
                        $('<div>').append($('<div style="color:gold;font-weight:bold">').text(' Tunnel Rat = Done').attr('title', QuestMiss.join(' ')))
                            .appendTo($c);
                    }
                }
                else {
                    if (TratQuest.length < 5) {
                        $('<div>').append($('<div style="color:#39ef4e;font-weight:bold">').text(' Tunnel Rat = In Progress').attr('title', TratQuest.join(' ')))
                            .appendTo($c);
                    }
                    else if (TratQuest.length < 10) {
                        $('<div>').append($('<div style="color:#99f7a4;font-weight:bold">').text(' Tunnel Rat = In Progress').attr('title', TratQuest.join(' ')))
                            .appendTo($c);
                    }
                    else if (TratQuest.length == 10) {
                        $('<div>').append($('<div style="color:red;font-weight:bold">').text(' Tunnel Rat = Not Started').attr('title', TratQuest.join(' ')))
                            .appendTo($c);
                    }
                }

                var OKill = st[11];			// ORYX KILL

                if (OKill < 1) {
                    $('<div>').append($('<div style="color:red;font-weight:bold">').text(' Oryx Kills = ' + OKill))
                        .appendTo($c);
                }
                else {
                    $('<div>').append($('<div style="color:gold;font-weight:bold">').text(' Oryx Kills = ' + OKill.toLocaleString()))
                        .appendTo($c);
                }

                var ShotData = [];			// ACCURACY
                var iAcc = round(100 * st[1] / st[0], 2);
                var l2Acc = (0.75 * st[0] - st[1]) / 0.25;
                if (Math.ceil(l2Acc) == l2Acc) l2Acc += 1;
                var l2Acc2 = (0.5 * st[0] - st[1]) / 0.5;
                if (Math.ceil(l2Acc2) == l2Acc2) l2Acc2 += 1;
                var l2Acc3 = (0.25 * st[0] - st[1]) / 0.75;
                if (Math.ceil(l2Acc3) == l2Acc3) l2Acc3 += 1;

                l2Acc = 'Accurate : ' + Math.ceil(l2Acc3).toLocaleString() + ' Shots Left\nSharpshooter : ' + Math.ceil(l2Acc2).toLocaleString() + ' Shots Left\nSniper : ' + Math.ceil(l2Acc).toLocaleString() + ' Shots Left';;

                ShotData.push('Shots : ' + st[0].toLocaleString() + '\nHits : ' + st[1].toLocaleString() + '\nAbility : ' + st[2].toLocaleString() + '\n\n' + l2Acc);

                if (iAcc < 75) {
                    if (iAcc < 50) {
                        if (iAcc < 25) {
                            $('<div>').append($('<div style="color:red;font-weight:bold">').text(' Accuracy = ' + iAcc + ' % ').attr('title', ShotData))
                                .appendTo($c);
                        }
                        else {
                            $('<div>').append($('<div style="color:#99f7a4;font-weight:bold">').text(' Accuracy = ' + iAcc + ' % ').attr('title', ShotData))
                                .appendTo($c);
                        }
                    }
                    else {
                        $('<div>').append($('<div style="color:#39ef4e;font-weight:bold">').text(' Accuracy = ' + iAcc + ' % ').attr('title', ShotData))
                            .appendTo($c);
                    }
                }
                else {
                    $('<div>').append($('<div style="color:gold;font-weight:bold">').text(' Accuracy = ' + iAcc + ' % ').attr('title', ShotData))
                        .appendTo($c);
                }

                var GodKillRatio = round(100 * st[8] / (st[6] + st[8]), 2);			// GOD KILL
                var GodData = [];
                var GodKillLeft = st[6] - st[8] + 1;
                var tenpercent = st[6] / 9 - st[8];
                GodData.push('Monster Kills : ' + st[6].toLocaleString() + '\nGod Kills : ' + st[8].toLocaleString() + '\n\nEnnemy of the Gods : ' + Math.ceil(tenpercent).toLocaleString() + ' Kills Left\nSlayer of the Gods : ' + GodKillLeft.toLocaleString() + ' Kills Left');

                if (GodKillRatio > 0) {
                    if (GodKillRatio > 10) {
                        if (GodKillRatio > 50) {
                            $('<div>').append($('<div style="color:gold;font-weight:bold">').text(' God Kill Ratio = ' + GodKillRatio + ' %').attr('title', GodData))
                                .appendTo($c);
                        }
                        else {
                            $('<div>').append($('<div style="color:#39ef4e;font-weight:bold">').text(' God Kill Ratio = ' + GodKillRatio + ' %').attr('title', GodData))
                                .appendTo($c);
                        }
                    }
                    else {
                        $('<div>').append($('<div style="color:#99f7a4;font-weight:bold">').text(' God Kill Ratio = ' + GodKillRatio + ' %').attr('title', GodData))
                            .appendTo($c);
                    }
                }
                else {
                    $('<div>').append($('<div style="color:red;font-weight:bold">').text(' God Kill Ratio = 0 %').attr('title', GodData))
                        .appendTo($c);
                }

                var LvlUp = st[19];			// LEVEL UP
                var LvlUpLeft = 1000 - st[19] + 1;
                if (LvlUpLeft > 0) {
                    if (LvlUpLeft > 900) {
                        var LvlUpLeft2 = LvlUpLeft - 900;
                        LvlUpLeft = 'Team Player : ' + LvlUpLeft2.toLocaleString() + ' Level Up Left\nLeader of Men : ' + LvlUpLeft.toLocaleString() + ' Level Up Left';
                    }
                    else {
                        LvlUpLeft = 'Leader of Men : ' + LvlUpLeft.toLocaleString() + ' Level Up Left';
                    }
                }
                if (LvlUpLeft <= 0) LvlUpLeft = '';

                if (LvlUp > 0) {
                    if (LvlUp > 100) {
                        if (LvlUp > 1000) {
                            $('<div>').append($('<div style="color:gold;font-weight:bold">').text(' Level Up = ' + LvlUp.toLocaleString()).attr('title', LvlUpLeft))
                                .appendTo($c);
                        }
                        else {
                            $('<div>').append($('<div style="color:#39ef4e;font-weight:bold">').text(' Level Up = ' + LvlUp.toLocaleString()).attr('title', LvlUpLeft))
                                .appendTo($c);
                        }
                    }
                    else {
                        $('<div>').append($('<div style="color:#99f7a4;font-weight:bold">').text(' Level Up = ' + LvlUp.toLocaleString()).attr('title', LvlUpLeft))
                            .appendTo($c);
                    }
                }
                else {
                    $('<div>').append($('<div style="color:red;font-weight:bold">').text(' Level Up = ' + LvlUp.toLocaleString()).attr('title', LvlUpLeft))
                        .appendTo($c);
                }

                var QuestDone = st[12]; 		// QUESTS
                if (QuestDone < 1001) {
                    QuestDone = QuestDone.toLocaleString() + ' / 1000';
                }
                else {
                    QuestDone = QuestDone.toLocaleString();
                }


                if (st[12] < 1001) {
                    if (st[12] < 500) {
                        if (st[12] < 1) {
                            $('<div>').append($('<div style="color:red;font-weight:bold">').text(' Quests Completed = ' + QuestDone).attr('title', QuestList.join(' ')))
                                .appendTo($c);
                        }
                        else {
                            $('<div>').append($('<div style="color:#99f7a4;font-weight:bold">').text(' Quests Completed = ' + QuestDone).attr('title', QuestList.join(' ')))
                                .appendTo($c);
                        }
                    }
                    else {
                        $('<div>').append($('<div style="color:#39ef4e;font-weight:bold">').text(' Quests Completed = ' + QuestDone).attr('title', QuestList.join(' ')))
                            .appendTo($c);
                    }
                }
                else {
                    $('<div>').append($('<div style="color:gold;font-weight:bold">').text(' Quests Completed = ' + QuestDone).attr('title', QuestList.join(' ')))
                        .appendTo($c);
                }
                if (setuptools.data.config.debugging === true) setuptools.app.uaTiming('mule', 'parseWawawa', 'stop', this.guid);

            }
            // WAWAWA PART END
            /////////////////////////

            if (this.opt('pcstats') || this.opt('goals')) {


                f = true;
                $c.append(window.printstats(c, d, this.opt('goals'), this.opt('pcstats'), this));
            }
            arr.push($c);

            setuptools.app.uaTiming('mule', 'mainCharLoopTimer', 'stop', this.guid);

        }

        if (!this.opt('shrink') && f) {
            this.dom.append($('<hr class="chars">'));
            maketable('chars', arr, currentMuleEffectiveROW).appendTo(this.dom); 
        }
        arr = [];

        //  record cummulative timing data
        /* too much noise
        if ( typeof timing.aggregate['mule-mainCharLoopTimer'] === 'object' ) setuptools.app.ga('timing', {
            category: 'mule',
            key: 'parseMainCharacterLoop',
            value: timing.aggregate['mule-mainCharLoopTimer'].mean
        });
        */

        function makechest(items, classname, index) {
            var il = setuptools.app.muledump.item_listing(items.slice(0, 8), classname)
            // VAULTORDER is now a simple sequential array [1, 2, ..., num_vaults]
            // 'index' is the 0-based index of the actual vault being rendered.
            return $('<div class="items" data-vaultId="' + ( (VAULTORDER && VAULTORDER[index] !== undefined) ? VAULTORDER[index] : 0) + '">').append(il);
        }

        // Removed vaultlayout selection from options and vaultbuilder
        // Vault width is determined by currentMuleEffectiveROW
        var maxVaultWidthForThisMule = currentMuleEffectiveROW;
        
        // VAULTORDER will be populated based on actual chests later.
        // Global VAULTORDER is used by makechest.

        //  vaults
        var chests_for_counting; // Renamed to avoid conflict if 'chests' is used later for display data
        if (d.Account.Vault && this.totals.cache === false) {

            //  counting for totals
            chests_for_counting = d.Account.Vault ? d.Account.Vault.Chest || ['-1'] : ['-1'];
            if (typeof chests_for_counting === 'string') chests_for_counting = [chests_for_counting];
            if (typeof chests_for_counting === 'object' && !Array.isArray(chests_for_counting) && Object.keys(chests_for_counting).length === 0) chests_for_counting = ['-1'];
            if (Array.isArray(chests_for_counting) && chests_for_counting.length === 0) chests_for_counting = ['-1'];


            for (var tv = 0; tv < chests_for_counting.length; tv++) {

                if (chests_for_counting[tv] === 0) continue; // Should not happen with string arrays
                if (typeof chests_for_counting[tv] !== 'string') chests_for_counting[tv] = '-1';
                var chest_items_for_counting = chests_for_counting[tv].split(',');
                for (var tv2 = 0; tv2 < 8; tv2++)
                    this.totals.count(chest_items_for_counting[tv2] || '-1', 'vaults');

            }
        }

        //  display vaults
        if (this.opt('vaults')) {

            if (setuptools.data.config.debugging === true) setuptools.app.uaTiming('mule', 'parseVaults', 'start', this.guid, false, setuptools.app.uaTimingAggregate);
            if (this.loginOnly === false && !this.opt('shrink')) this.dom.append($('<hr class="vaults">'));

            var displayChestsData = d.Account.Vault ? (d.Account.Vault.Chest || ['-1']) : ['-1'];
            if (typeof displayChestsData === 'string') {
                displayChestsData = [displayChestsData];
            } else if (typeof displayChestsData === 'object' && !Array.isArray(displayChestsData) && Object.keys(displayChestsData).length === 0) {
                displayChestsData = ['-1'];
            } else if (Array.isArray(displayChestsData) && displayChestsData.length === 0 ) {
                displayChestsData = ['-1'];
            }
            // At this point, displayChestsData is an array of strings, each string representing one vault's contents.
            // e.g., ["vault1items", "vault2items"] or ["-1"] for one empty vault.
            // If displayChestsData is ["-1"] and it truly means no vaults, its length is 1.
            // However, if Account.Vault.Chest is undefined, it becomes ['-1'], meaning one (empty) vault placeholder.

            // Populate global VAULTORDER for makechest's data-vaultId attribute
            VAULTORDER = [];
            // displayChestsData contains one string per vault. If it's ["-1"] from no vault, length is 1.
            // This means it will generate VAULTORDER = [1] for a single placeholder empty vault.
            for (var i = 0; i < displayChestsData.length; i++) {
                // If displayChestsData is ["-1"] and it represents the *absence* of any vaults (e.g. API returns nothing for Vault.Chest)
                // then we should not create a VAULTORDER entry.
                // However, the current logic makes displayChestsData = ['-1'] if Vault.Chest is undefined or empty.
                // This implies one empty vault is always shown. If that's the desired behavior:
                if (displayChestsData.length === 1 && displayChestsData[0] === '-1') {
                    // Check if this '-1' truly represents an empty vault or absence of vaults.
                    // For simplicity, assume ['-1'] means one empty vault slot.
                    VAULTORDER.push(1);
                } else {
                    VAULTORDER.push(i + 1); // Vault IDs are 1-indexed
                }
            }
            if (displayChestsData.length === 1 && displayChestsData[0] === "-1" && VAULTORDER.length === 0) {
                // ensure if displayChestsData is just ["-1"] (one empty vault), VAULTORDER is [1]
                 VAULTORDER = [1];
            }


            var w_arranged = arrangevaults(displayChestsData, maxVaultWidthForThisMule); 
            var arranged_chests_items_data = w_arranged[1]; // Array of chest data strings or nulls
            var actual_vault_cols = w_arranged[0];
            var arr_vaults = []; // Holds jQuery objects (rendered chests) or nulls

            var currentVaultOriginalIdIndex = 0; // 0-based index for actual vaults encountered
            for (var x = 0; x < arranged_chests_items_data.length; x++) {
                var chest_data_string = arranged_chests_items_data[x];
                if (chest_data_string !== null) {
                    // This is an actual vault (data string, could be empty items like "-1,-1...")
                    var chest_content_array = (chest_data_string || '-1').split(',');
                    while (chest_content_array.length < 8) chest_content_array.push('-1');
                    
                    arr_vaults.push(makechest(chest_content_array, 'vaults', currentVaultOriginalIdIndex));
                    currentVaultOriginalIdIndex++;
                } else {
                    // This is a spacer from arrangevaults padding
                    arr_vaults.push(null);
                }
            }

            if (this.loginOnly === false && !this.opt('shrink') && arr_vaults.length > 0) {
                if (actual_vault_cols > 0 || arr_vaults.some(item => item !== null)) {
                     maketable('vaults', arr_vaults, actual_vault_cols).appendTo(this.dom);
                }
            }
            if (setuptools.data.config.debugging === true) setuptools.app.uaTiming('mule', 'parseVaults', 'stop', this.guid);

        }

        // materialschest counting for totals
        if (!(d.Account.MaterialStorage === undefined)) {

            var materials;
            if (d.Account && d.Account.MaterialStorage && d.Account.MaterialStorage.Chest) {
                if (Array.isArray(d.Account.MaterialStorage.Chest)) {
                    // If the chest is an array, join its elements
                    materials = d.Account.MaterialStorage.Chest.join(',');
                } else {
                    // If the chest is not an array, assign it directly
                    materials = d.Account.MaterialStorage.Chest;
                }
            } else {
                // Handle the case when Account or MaterialStorage or Chest is undefined
                materials = ''; // or whatever default value you want to assign
            }

            var items = (typeof materials === 'string') ? materials.split(',').reverse() : undefined;
            if (Array.isArray(items) === true && this.totals.cache === false) {
                for (var tg = 0; tg < items.length; tg++)
                    this.totals.count(items[tg], 'materials');
            }
        }

        //  display materialschest
        if (this.opt('materials') && !(d.Account.MaterialStorage === undefined)) {

            if (setuptools.data.config.debugging === true) setuptools.app.uaTiming('mule', 'parseMaterials', 'start', this.guid, false, setuptools.app.uaTimingAggregate);
            if (this.loginOnly === false && !this.opt('shrink')) this.dom.append($('<hr class="materials">'));
            if (Array.isArray(items) === true) {

                var marr = [];
                while (items.length) {
                    while (items.length < 8) items.push("-1");
                    marr.push(makechest(items, 'materials'));
                    items = items.slice(8);
                }
                if (this.loginOnly === false && !this.opt('shrink')) maketable('materials', marr, ((setuptools.data.config.giftChestWidth === 0) ? currentMuleEffectiveROW : setuptools.data.config.giftChestWidth)).appendTo(this.dom);
            }
            if (setuptools.data.config.debugging === true) setuptools.app.uaTiming('mule', 'parseMaterials', 'stop', this.guid);

        }

        // ssnlspoils counting for totals
        var spoils = d.Account.TemporaryGifts;
        var items = (typeof spoils === 'string') ? spoils.split(',').reverse() : undefined;
        if (Array.isArray(items) === true && this.totals.cache === false) {
            for (var tg = 0; tg < items.length; tg++)
                this.totals.count(items[tg], 'spoils');
        }

        // display ssnlspoils
        if (this.opt('spoils')) {

            if (setuptools.data.config.debugging === true) setuptools.app.uaTiming('mule', 'parseSpoils', 'start', this.guid, false, setuptools.app.uaTimingAggregate);
            if (this.loginOnly === false && !this.opt('shrink')) this.dom.append($('<hr class="spoils">'));
            if (Array.isArray(items) === true) {

                var sarr = [];
                while (items.length) {
                    sarr.push(makechest(items, 'spoils'));
                    items = items.slice(8);
                }
                if (this.loginOnly === false && !this.opt('shrink')) maketable('spoils', sarr, ((setuptools.data.config.giftChestWidth === 0) ? currentMuleEffectiveROW : setuptools.data.config.giftChestWidth)).appendTo(this.dom);
            }
            if (setuptools.data.config.debugging === true) setuptools.app.uaTiming('mule', 'parseSpoils', 'stop', this.guid);

        }

        //  potion storage counting for totals
        var potions = d.Account.Potions;
        var items = (typeof potions === 'string') ? potions.split(',') : undefined;
        if (Array.isArray(items) === true && this.totals.cache === false) {
            for (var tp = 0; tp < items.length; tp++) {
                if (items[tp] !== "-1") {
                    this.totals.count(items[tp], 'potions');
                }
            }
        }

        //  display potion storage
        if (this.opt('potions')) {

            if (setuptools.data.config.debugging === true) setuptools.app.uaTiming('mule', 'parsePotions', 'start', this.guid, false, setuptools.app.uaTimingAggregate);
            if (this.loginOnly === false && !this.opt('shrink')) {
                this.dom.append($('<hr class="potions">'));
                if (Array.isArray(items) === true) {

                    var counters = [{ item: "-1", count: 0 }];
                    for (var tp = 0; tp < items.length; tp++) {
                        if (items[tp] >= 0x2368) {
                            // Greater potions take two slots in the client but not the API
                            counters[0].count--;
                        }
                        var ndx = counters.findIndex(c => c.item === items[tp]);
                        if (ndx === -1) {
                            counters.push({ item: items[tp], count: 1 });
                        } else {
                            counters[ndx].count++;
                        }
                    }
                    counters.sort((a, b) => {
                        if (a.item === "-1") {
                            return 1;
                        } else if (b.item === "-1") {
                            return -1;
                        } else {
                            return a.item - b.item;
                        }
                    });

                    var r = $('<div class="itemsc potions noselect">');
                    for (var tp = 0; tp < counters.length; tp++) {
                        if (counters[tp].count > 0) {
                            setuptools.app.muledump.item(counters[tp].item, undefined, counters[tp].count, undefined).appendTo(r);
                        }
                    }
                    $('<div class="items">').append(r).appendTo(this.dom);
                }
            }
            if (setuptools.data.config.debugging === true) setuptools.app.uaTiming('mule', 'parsePotions', 'stop', this.guid);

        }

        // ssnlpetinv couting for totals
        var ssnlpetinv;
        if (!(d.Char === undefined)) {
            for (let index = 0; index < d.Char.length; index++)
                {
                if(d.Char[index].Seasonal === "True" && d.Char[index].Pet !== undefined && d.Char[index].Pet.inv !== undefined)
                    ssnlpetinv = d.Char[index].Pet.inv.split(';')[2];
                }

            var items = (typeof ssnlpetinv === 'string') ? ssnlpetinv.split(',').reverse() : undefined;
            if (Array.isArray(items) === true && this.totals.cache === false) {
                for (var tg = 0; tg < items.length; tg++)
                    this.totals.count(items[tg], 'ssnlpetinv');
            }
        }
        
        // display ssnlpetinv
        if (this.opt('ssnlpetinv') && !(d.Char === undefined)) {

            if (setuptools.data.config.debugging === true) setuptools.app.uaTiming('mule', 'parseSsnlpetinv', 'start', this.guid, false, setuptools.app.uaTimingAggregate);
            if (this.loginOnly === false && !this.opt('shrink')) this.dom.append($('<hr class="ssnlpetinv">'));
            if (Array.isArray(items) === true) {

                var sarr = [];
                while (items.length) {
                    sarr.push(makechest(items, 'ssnlpetinv'));
                    items = items.slice(8);
                }
                if (this.loginOnly === false && !this.opt('shrink')) maketable('ssnlpetinv', sarr, ((setuptools.data.config.giftChestWidth === 0) ? currentMuleEffectiveROW : setuptools.data.config.giftChestWidth)).appendTo(this.dom);
            }
            if (setuptools.data.config.debugging === true) setuptools.app.uaTiming('mule', 'parseSsnlpetinv', 'stop', this.guid);

        }

        // petinv couting for totals
        var petinv;
        if (!(d.Char === undefined)){
            for (let index = 0; index < d.Char.length; index++) 
                if(d.Char[index].Seasonal === "False" && d.Char[index].Pet !== undefined && d.Char[index].Pet.inv !== undefined)
                    petinv = d.Char[index].Pet.inv.split(';')[2];

            var items = (typeof petinv === 'string') ? petinv.split(',').reverse() : undefined;
            if (Array.isArray(items) === true && this.totals.cache === false) {
                for (var tg = 0; tg < items.length; tg++)
                    this.totals.count(items[tg], 'petinv');
            }
        }
        
        // display petinv
        if (this.opt('petinv') && !(d.Char === undefined)) {

            if (setuptools.data.config.debugging === true) setuptools.app.uaTiming('mule', 'parsePetinv', 'start', this.guid, false, setuptools.app.uaTimingAggregate);
            if (this.loginOnly === false && !this.opt('shrink')) this.dom.append($('<hr class="petinv">'));
            if (Array.isArray(items) === true) {

                var sarr = [];
                while (items.length) {
                    sarr.push(makechest(items, 'petinv'));
                    items = items.slice(8);
                }
                if (this.loginOnly === false && !this.opt('shrink')) maketable('petinv', sarr, ((setuptools.data.config.giftChestWidth === 0) ? currentMuleEffectiveROW : setuptools.data.config.giftChestWidth)).appendTo(this.dom);
            }
            if (setuptools.data.config.debugging === true) setuptools.app.uaTiming('mule', 'parsePetinv', 'stop', this.guid);

        }


        //  gift chests counting for totals
        var gifts = d.Account.Gifts;
        var items = (typeof gifts === 'string') ? gifts.split(',').reverse() : undefined;
        if (Array.isArray(items) === true && this.totals.cache === false) {
            for (var tg = 0; tg < items.length; tg++)
                this.totals.count(items[tg], 'gifts');
        }

        //  display gift chests
        if (this.opt('gifts')) {

            if (setuptools.data.config.debugging === true) setuptools.app.uaTiming('mule', 'parseGifts', 'start', this.guid, false, setuptools.app.uaTimingAggregate);
            if (this.loginOnly === false && !this.opt('shrink')) this.dom.append($('<hr class="gifts">'));
            if (Array.isArray(items) === true) { // items here refers to gifts

                var garr = [];
                while (items.length) {
                    // The makechest function itself doesn't take a width, 
                    // it's assumed to be a single chest's content.
                    // The width is applied by maketable to the array of chests.
                    while (items.length < 8) items.push("-1"); // Ensure items has 8 elements for makechest
                    garr.push(makechest(items.slice(0, 8), 'gifts')); // makechest takes first 8
                    items = items.slice(8); // Prepare for next chest
                }
                // Apply the new logic to the maketable call for gifts
                if (this.loginOnly === false && !this.opt('shrink')) maketable('gifts', garr, ((setuptools.data.config.giftChestWidth === 0) ? currentMuleEffectiveROW : setuptools.data.config.giftChestWidth)).appendTo(this.dom);
            }
            if (setuptools.data.config.debugging === true) setuptools.app.uaTiming('mule', 'parseGifts', 'stop', this.guid);
        }

        setuptools.app.uaTiming('mule', 'parse', 'stop', this.guid);

        if (this.totals.cache === false) {
            this.totals.save();
            this.redoTotals = true;
        }

        if (this.loginOnly === false) {

            var original = this.loaded;
            this.loaded = true;
            this.dom.css('display', 'inline-block');
            relayout((original === false || this.redoTotals === true) ? undefined : false);

        }

        //  hotkey for creating image of mule
        this.dom.on('click.mule.screenshot', function (e) {
            var dom = $(this)[0];
            //  this does not work as intended; need to clone somehow instead: // $(dom).find('.button').remove();
            if (setuptools.app.muledump.keys(['ctrl', 'shift'], e) === true) setuptools.app.muledump.exporter.canvas(dom);
        });

        //  hotkey for creating image of all chars
        this.dom.find('table.chars').on('click.chars.screenshot', function (e) {
            if (setuptools.app.muledump.keys(['ctrl', 'shift'], e) === true) setuptools.app.muledump.exporter.canvas($(this)[0]);
        });

        //  hotkey for creating image of a char
        this.dom.find('table.chars > tr > td.cont').on('click.char.screenshot', function (e) {
            if (setuptools.app.muledump.keys(['ctrl', 'shift'], e) === true) setuptools.app.muledump.exporter.canvas($(this)[0]);
        });

        //  hotkey for creating image of specific vault
        this.dom.find('table.vaults > tr > td.cont').on('click.vault.screenshot', function (e) {
            if (setuptools.app.muledump.keys(['ctrl', 'shift'], e) === true) setuptools.app.muledump.exporter.canvas($(this)[0]);
        });

        //   hotkey for creating image of potion storage
        this.dom.find('table.potions').on('click.potions.screenshot', function (e) {
            if (setuptools.app.muledump.keys(['ctrl', 'shift'], e) === true) setuptools.app.muledump.exporter.canvas($(this)[0]);
        });

        //   hotkey for creating image of gift chests
        this.dom.find('table.gifts').on('click.gifts.screenshot', function (e) {
            if (setuptools.app.muledump.keys(['ctrl', 'shift'], e) === true) setuptools.app.muledump.exporter.canvas($(this)[0]);
        });

    };

    window.Mule = Mule


})($, window);