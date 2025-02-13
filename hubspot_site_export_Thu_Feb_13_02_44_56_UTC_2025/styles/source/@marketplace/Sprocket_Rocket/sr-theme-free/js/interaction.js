class Cookie {
	/* Cookie.get('cookieName'); */
	static get (name) {
		const cookieName = encodeURIComponent(name) + '=';
		const cookie = document.cookie;
		let value = null;

		const startIndex = cookie.indexOf(cookieName);
		if (startIndex > -1) {
			let endIndex = cookie.indexOf(';', startIndex);
			if (endIndex == -1) {
				endIndex = cookie.length;
			}
			value = decodeURIComponent(cookie.substring(startIndex + cookieName.length, endIndex)).replace(/^=/, '');
		}

		if (value === '') {
			value = null;
		}

		return value;
	}

	/* Cookie.set('cookieName', 'cookieValue', expirationDate, '/'); */
	static set (name, value, expires, path, domain, secure) {
		let cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
		if (expires instanceof Date) {
			cookieText += '; expires=' + expires.toUTCString();
		}

		if (path) cookieText += '; path=' + path;
		if (domain) cookieText += '; domain=' + domain;
		if (secure != false) cookieText += '; secure';

		document.cookie = cookieText;
	}

	/* Cookie.remove('cookieName'); */
	static remove (name, path, domain, secure) {
		Cookie.set(name, '', new Date(0), path, domain, secure);
	}
}

if (typeof bootstrap === 'undefined' || typeof bootstrap.Modal === 'undefined') {
    var modalDialogMap = {};
    var modalButtons = document.querySelectorAll('[data-toggle="modal"], [data-dismiss="modal"]');
    var body = document.body;
    var modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'modal-backdrop';
    var modalDialog;
    
    function cacheModalDialog() {
        modalDialog = modalDialog || document.querySelector('.modal-dialog');
    }

    function showModal(modalId, enabledClose) {
        var modal = document.getElementById(modalId);

        if (modal.classList.contains("modal")) {
            body.appendChild(modalBackdrop);
            modalBackdrop.classList.toggle('show', true);
            modal.classList.toggle('show', true);
            modal.style.display = 'block';
            body.classList.toggle('modal-open', true);

            if (enabledClose !== false) {
                modal.addEventListener('click', handleModalClick);
            }

            var storedModalDialog = modalDialogMap[modalId];
            if (storedModalDialog) {
                modal.innerHTML = '';
                modal.appendChild(storedModalDialog);

                // Re-add video elements
                var videoContainer = storedModalDialog.querySelector('.video-container[data-video-src]');
                if (videoContainer) {
                    var videoElement = document.createElement('video');
                    videoElement.src = videoContainer.dataset.videoSrc;
                    videoElement.controls = true; // Add more attributes as needed
                    videoContainer.appendChild(videoElement);
                }

                // Re-add iframe elements
                var iframeContainer = storedModalDialog.querySelector('.iframe-container[data-iframe-src]');
                if (iframeContainer) {
                    var iframeElement = document.createElement('iframe');
                    iframeElement.src = iframeContainer.dataset.iframeSrc;
                    iframeContainer.appendChild(iframeElement);
                }
            }
        }
    }

    function hideModal(modalId) {
        var modal = document.getElementById(modalId);
        var modalDialog = modal.querySelector('.modal-dialog');

        modalDialogMap[modalId] = modalDialog.cloneNode(true);

        // Remove video elements and store their src
        var videoElements = modalDialog.querySelectorAll('video');
        videoElements.forEach(function (videoElement) {
            var videoContainer = videoElement.parentNode;
            videoContainer.dataset.videoSrc = videoElement.src;
            videoElement.remove();
        });

        // Remove iframe elements and store their src
        var iframeElements = modalDialog.querySelectorAll('iframe');
        iframeElements.forEach(function (iframeElement) {
            var iframeContainer = iframeElement.parentNode;
            iframeContainer.dataset.iframeSrc = iframeElement.src;
            iframeElement.remove();
        });

        modal.classList.toggle('show', false);
        modal.style.display = 'none';
        modalBackdrop.classList.toggle('show', false);
        body.classList.toggle('modal-open', false);

        modal.removeEventListener('click', handleModalClick);

        cacheModalDialog();
    }

    function handleModalClick(e) {
        var target = e.target;
        var modal = e.currentTarget;
        if (target.classList.contains('modal') || target.dataset.dismiss === 'modal') {
            hideModal(modal.id);
        }
    }

    modalButtons.forEach(function (button) {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            if (button.dataset.dismiss === 'modal') {
                var modal = button.closest('.modal');
                hideModal(modal.id);
                return;
            }
            var modalId = button.getAttribute('data-target').replace('#', '');
            showModal(modalId);
        });
    });
}

function equalHeight (elements, minHeight) {
	let maxHeight = 0;
	for (let i = 0; i < elements.length; i++) {
		const elementHeight = elements[i].clientHeight;
		maxHeight = Math.max(maxHeight, elementHeight);
	}
	for (let i = 0; i < elements.length; i++) {
		if (minHeight == false)
			elements[i].style.height = maxHeight + 'px';
		else
			elements[i].style.minHeight = maxHeight + 'px';
	}
}

const tabLinks = document.querySelectorAll('.nav-tabs .nav-link');

tabLinks.forEach(function (tabLink) {
	tabLink.addEventListener('click', function (e) {
		e.preventDefault();

		const target = e.target.closest(".nav-link");
		if (!target) return;

		const siblings = Array.from(target.closest('.nav-tabs').querySelectorAll('.nav-link'));
		siblings.forEach(function (link) {
			link.classList.remove('active');
		});

		target.classList.add('active');

		const tabContentId = target.dataset.tab

		const tabContents = document.querySelectorAll(`.tab-pane[data-tab="${tabContentId}"]`);

		if (!tabContents.length) return;


		tabContents.forEach(function (tabContent) {

			const tabContainer = tabContent.closest('.tab-content');
			const tabContentSiblings = Array.from(tabContainer.children);

			tabContentSiblings.forEach(function (content) {
				if (!Array.from(tabContents).includes(content)) {
					content.classList.remove('show', 'active');
				}
			});

			tabContent.classList.add('show', 'active');
		});
	});
});

/*
Example usage:
	let details;
	module.querySelectorAll(".details-group").forEach((detail) => {
		details = new Details(detail, {
			one_visible: detail.dataset.one
		});
	})
Recalculate height:
	details.render();
*/
class Details {
	constructor(el, settings) {
		this.group = el;
		this.details = this.group.getElementsByClassName("details");
		this.toggles = this.group.getElementsByClassName("details__summary");
		this.contents = this.group.getElementsByClassName("details__content");

		this.settings = Object.assign({
			speed: 500,
			one_visible: true
		}, settings);

		this.render();

		this.group.addEventListener("click", (e) => {
			const target = e.target.classList.contains("details__summary") ? e.target : e.target.parentNode;
			if (target.classList.contains("details__summary")) {
				e.preventDefault();

				let num = 0;
				for (let i = 0; i < this.toggles.length; i++) {
					if (this.toggles[i] === target) {
						num = i;
						break;
					}
				}

				if (!target.parentNode.hasAttribute("open")) {
					this.open(num);
				} else {
					this.close(num);
				}
			}
		});
	}

	render () {
		for (let i = 0; i < this.details.length; i++) {
			const detail = this.details[i];
			const toggle = this.toggles[i];
			const content = this.contents[i];

			detail.style.transitionDuration = this.settings.speed + "ms";

			if (!detail.hasAttribute("open")) {
				detail.style.height = toggle.offsetHeight + "px";
			} else {
				detail.style.height = toggle.offsetHeight + content.offsetHeight + "px";
			}
		}
	}

	open (i) {
		const detail = this.details[i];
		const toggle = this.toggles[i];
		const content = this.contents[i];

		if (this.settings.one_visible) {
			for (let a = 0; a < this.toggles.length; a++) {
				if (i !== a) this.close(a);
			}
		}

		detail.classList.remove("is-closing");
		const toggle_height = toggle.offsetHeight;
		detail.setAttribute("open", true);
		const content_height = content.offsetHeight;
		detail.removeAttribute("open");
		detail.style.height = toggle_height + content_height + "px";
		detail.setAttribute("open", true);
	}

	close (i) {
		const detail = this.details[i];
		const toggle = this.toggles[i];
		detail.classList.add("is-closing");
		const toggle_height = toggle.offsetHeight;
		detail.style.height = toggle_height + "px";
		setTimeout(() => {

			if (detail.classList.contains("is-closing"))
				detail.removeAttribute("open");
			detail.classList.remove("is-closing");
		}, this.settings.speed);
	}
}