import "./components/export"
class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        const categories = await this.fetchCategories();
        this.render(categories);
        this.addSearchBarEventListener();
        this.addEventListener('categorySearch', (event) => this.handleCategorySearch(event as CustomEvent));
    }

    async fetchCategories(): Promise<string[]> {
        try {
            const response = await fetch('https://api.chucknorris.io/jokes/categories');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    }

    

    render(categories: string[]) {
        if (this.shadowRoot) {
            const searchBarHtml = `<search-bar></search-bar>`;
            const cardsHtml = categories.map(category => `<app-card category="${category}"></app-card>`).join('');
            this.shadowRoot.innerHTML = `${searchBarHtml}${cardsHtml}`;
        }
    }
    
    addSearchBarEventListener() {
        const searchBar = this.shadowRoot?.querySelector('search-bar');
        if (searchBar) {
            searchBar.addEventListener('categorySearch', (event: Event) => {
                const customEvent = event as CustomEvent;
                this.handleCategorySearch(customEvent.detail.category);
            });
        }
    }
    async handleCategorySearch(event: CustomEvent) {
        const inputCategory = event.detail.category;
        if (inputCategory) {
            try {
                if (await this.isCategory(inputCategory)) {
                    const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${inputCategory}`);
                    const joke = await response.json();
                    if (this.shadowRoot) {
                        this.shadowRoot.innerHTML = `<app-card joke="${joke.value}" category="${inputCategory}"></app-card>`;
                    }
                } else {
                    const categories = await this.fetchCategories();
                    const filteredCategories = categories.filter(category => category.includes(inputCategory));
                    this.render(filteredCategories);
                }
            } catch (error) {
                console.error('Error fetching joke by category:', error);
            }
        } else {
            const categories = await this.fetchCategories();
            this.render(categories);
        }
    }
    
    async isCategory(category: string): Promise<boolean> {
        const categories = await this.fetchCategories();
        return categories.includes(category);
    }
}



customElements.define('app-container', AppContainer);

