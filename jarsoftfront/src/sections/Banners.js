import React, {Component} from "react";
import Tab from "react-bootstrap/Tab";
import {create, deleteByID, getAll, getBy, save} from "../requests/Requests";
import {getH3, getForm, getSelectForm, getP, getContainer, getButton, getNavItem} from "../getters/ElementsGetter";

export default class Banners extends Component {
    elements = null;
    contents = null;
    errorMessage = "";
    options = null;
    categoriesMap = null;

    constructor(props) {
        super(props);
        this.state = {
            searchBannerName: "",
            newBannerName: null,
            newBannerPrice: null,
            newBannerCategoryID: null,
            newBannerContent: null
        }
    }

    nullStates() {
        this.setState(
            {
                searchBannerName: "",
                newBannerName: null,
                newBannerPrice: null,
                newBannerCategoryID: null,
                newBannerContent: null
            }
        );
    }

    handleCategoryNameChoiceChange = (event) => {
        this.setState({newBannerCategoryID: this.categoriesMap.get(event.target.value)})
    }

    handleNewContentInputChange = (event) => {
        this.setState({newBannerContent: event.target.value})
    }

    handleNewPriceInputChange = (event) => {
        this.setState({newBannerPrice: event.target.value})
    }

    handleNewNameInputChange = (event) => {
        this.setState({newBannerName: event.target.value})
    }

    handleSearchInputChange = (event) => {
        this.setState({searchBannerName: event.target.value})
    }

    setErrorMessage(status) {
        if (status === 409) {
            this.errorMessage =
                "ERROR 409: some conflict occurred. Banner with this name already exists in database";
        }
        if (status === 400) {
            this.errorMessage = "ERROR 400: bad request. Parameters failed validation";
        }
    }

    init(name) {
        this.options = [];
        this.elements = [];
        this.contents = [];
        let categories = getAll("http://localhost:8081/categories/findAll");
        if (categories === null) {
            return;
        }
        this.categoriesMap = new Map();
        let j = 0;
        for (let i = 0; i < categories.length; i++) {
            let category = categories[i];
            if (category.deleted === false) {
                this.categoriesMap.set(category.id, category.name);
                this.categoriesMap.set(category.name, category.id);
                this.options[j] = <option value={category.name}>{category.name}</option>
                j++;
            }
        }
        let banners;
        if (name === "") {
            banners = getAll("http://localhost:8081/banners/findAll");
        } else {
            banners = getBy("http://localhost:8081/banners/findByName?name=", name);
        }
        if (banners === null) {
            return;
        }
        let length = (banners.length === undefined) ? 1 : banners.length;
        j = 0;
        for (let i = 0; i < length; i++) {
            let banner = (banners[i] === undefined) ? banners : banners[i];
            if (banner.deleted === false) {
                this.elements[j] = getNavItem(banner.name);
                this.contents[j] =
                    <Tab.Content>
                        <Tab.Pane eventKey={banner.name}>
                            {getH3(270, 125, 'black', "ID: " + banner.id)}
                            {getH3(270, 175, 'black', "Name")}
                            {getForm(270, 220, banner.name, "300px", this.handleNewNameInputChange)}
                            {getH3(270, 270, 'black', "Price:")}
                            {getForm(270, 315, banner.price, "300px", this.handleNewPriceInputChange)}
                            {getH3(270, 365, 'black', "Category: " + this.categoriesMap.get(banner.category_id))}
                            {getP(270, 410, 'back', "Change to: ")}
                            {getSelectForm(370, 410, this.options, "200px", this.handleCategoryNameChoiceChange)}
                            {getH3(270, 460, 'black', "Content:")}
                            {getForm(270, 505, banner.content, "300px", this.handleNewContentInputChange)}
                            {getButton(270, 570, 125, "Edit",
                                function () {
                                    let status = save(
                                        "http://localhost:8081/banners/save",
                                        {
                                            id: banner.id,
                                            name: (this.state.newBannerName === null) ?
                                                banner.name : this.state.newBannerName,
                                            price: (this.state.newBannerPrice === null) ?
                                                banner.price : this.state.newBannerPrice,
                                            category_id: (this.state.newBannerCategoryID === null) ?
                                                banner.category_id : this.state.newBannerCategoryID,
                                            content: (this.state.newBannerContent === null) ?
                                                banner.content : this.state.newBannerContent,
                                            deleted: false
                                        }
                                    );
                                    this.nullStates();
                                    this.setErrorMessage(status);
                                }.bind(this))}
                            {getButton(400, 570, 125, "Delete",
                                function () {
                                    deleteByID(
                                        "http://localhost:8081/banners/delete/",
                                        banner.id
                                    );
                                }.bind(this))}
                        </Tab.Pane>
                    </Tab.Content>
                j++;
            }
        }
    }

    render() {
        this.init(this.state.searchBannerName);
        return (
            <div className='mt-5'>
                {getH3(375, 75, 'red', this.errorMessage)}
                {getH3(10, 75, 'black', "Create new banner:")}
                {getForm(10, 125, "Type name...", "300px", this.handleNewNameInputChange)}
                {getForm(10, 165, "Type price...", "300px", this.handleNewPriceInputChange)}
                {getP(10, 205, 'back', "Category: ")}
                {getSelectForm(100, 205, this.options, "210px", this.handleCategoryNameChoiceChange)}
                {getForm(10, 245, "Type content...", "300px", this.handleNewContentInputChange)}
                {getButton(10, 290, 300, "Create",
                    function () {
                        let status = create(
                            "http://localhost:8081/banners/save",
                            {
                                name: this.state.newBannerName,
                                price: this.state.newBannerPrice,
                                category_id: this.state.newBannerCategoryID,
                                content: this.state.newBannerContent,
                                deleted: false
                            }
                        );
                        this.nullStates();
                        this.setErrorMessage(status);
                    }.bind(this))}
                {getH3(10, 350, 'black', "Banners:")}
                {getForm(10, 400, "Search for banner...", "300px", this.handleSearchInputChange)}
                {getContainer(-5, 440, this.elements, this.contents)}
            </div>
        );
    }
}