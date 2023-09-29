export default class SearchBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    .search-bar {
                        padding: 10px;
                    }
                    input {
                        width: calc(100% - 22px);
                        padding: 10px;
                        box-sizing: border-box;
                        margin-right: 10px;
                    }
                    button {
                        padding: 10px;
                    }
                </style>
                <div class="search-bar">
                    <input type="text" placeholder="Search by category" />
                    <button>Search</button>
                </div>
            `;

            const inputElement = this.shadowRoot!.querySelector('input')!;
            const buttonElement = this.shadowRoot!.querySelector('button')!;
            
            buttonElement.addEventListener('click', this.handleInput.bind(this));
        }
    }

    handleInput(event: Event) {
        const inputElement = this.shadowRoot!.querySelector('input')! as HTMLInputElement;
        const category = inputElement.value.trim();
        this.dispatchEvent(new CustomEvent('categorySearch', { detail: { category } }));
    }
}

customElements.define('search-bar', SearchBar);



