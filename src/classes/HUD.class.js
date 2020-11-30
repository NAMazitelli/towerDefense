
export class HUD {
	constructor(props) {
		this.purchase_menu = document.getElementById('ui_purchases_menu');
		this.gold_label = document.getElementById('gold_label');
		this.lives_label = document.getElementById('lives_label');
		this.hordes_left_label = document.getElementById('hordes_left_label');
		this.time_left_label = document.getElementById('time_left_label');
		this.loadingElem = document.querySelector('#loading-overlay');
		this.loadingbar = document.querySelector('#loading-bar')
		this.progress = this.loadingbar.querySelector('#progress');
	}

	update() {
		this.gold_label.innerHTML = window.gameState.gold;
		this.lives_label.innerHTML = window.gameState.lives;
		this.hordes_left_label.innerHTML = window.gameState.hordes_left;
		this.time_left_label.innerHTML = window.gameState.time_left;
	}

	setUpStore(purchaseButtonClick) {
		window.gameState.tower_settings.forEach((tower) => {
			let purchase_item_template = document.getElementById('purchase_btn_template').cloneNode();
			purchase_item_template.classList.add(tower.type)
			let price_span =  document.createElement('span');
			price_span.innerHTML = tower.price + " $";
			purchase_item_template.appendChild(price_span);

			purchase_item_template.classList.remove("hidden")
			purchase_item_template.addEventListener('click', function() { 
            	purchaseButtonClick(tower);
        	});
			this.purchase_menu.getElementsByClassName("purchase_options")[0].appendChild(purchase_item_template);
		});
	}

	showBuildingMenu() {
		this.purchase_menu.classList.remove("hidden");
	}

	hideBuildingMenu() {
		this.purchase_menu.classList.add("hidden");
	}
	
}