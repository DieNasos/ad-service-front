import React, {Component} from "react";
import Tab from "react-bootstrap/Tab";
import {create, deleteByID, getAll, getBy, save} from "../requests/Requests";
import {getH3, getForm, getContainer, getButton, getNavItem} from "../getters/ElementsGetter";

export default class Categories extends Component {
    elements = null;
    contents = null;
    errorMessage = "";

    constructor(props) {
        super(props);
        this.state = {
            searchCategoryName: "",
            newCategoryName: null,
            newCategoryRequestName: null,
            deleteCategoryID: null
        }
    }

    nullState() {
        this.setState(
            {
                searchCategoryName: "",
                newCategoryName: null,
                newCategoryRequestName: null,
                deleteCategoryID: null
            }
        );
    }

    handleNewRequestNameInputChange = (event) => {
        this.setState({newCategoryRequestName: event.target.value})
    }

    handleNewNameInputChange = (event) => {
        this.setState({newCategoryName: event.target.value})
    }

    handleSearchInputChange = (event) => {
        this.setState({searchCategoryName: event.target.value})
    }

    setErrorMessage(status) {
        if (status === 409) {
            this.errorMessage =
                "ERROR 409: some conflict occurred. Category with this name or request name already exists in database";
        }
        if (status === 403) {
            this.errorMessage =
                "ERROR 403: forbidden. Could not delete category with banners associated. IDs: ";
            let banners = getBy(
                "http://localhost:8081/banners/findByCategoryID/",
                this.state.deleteCategoryID
            );
            if (banners !== null) {
                for (let i = 0; i < banners.length; i++) {
                    this.errorMessage += banners[i].id + " ";
                }
            }
        }
        if (status === 400) {
            this.errorMessage =
                "ERROR 400: bad request. Parameters failed validation";
        }
    }

    init(name) {
        this.elements = [];
        this.contents = [];
        let categories;
        if (name === "") {
            categories = getAll("http://localhost:8081/categories/findAll");
        } else {
            categories = getBy("http://localhost:8081/categories/findByName?name=",name);
        }
        if (categories === null) {
            return;
        }
        let length = (categories.length === undefined) ? 1 : categories.length;
        let j = 0;
        for (let i = 0; i < length; i++) {
            let category = (categories[i] === undefined) ? categories : categories[i];
            if (category.deleted === false) {
                this.elements[j] = getNavItem(category.name);
                this.contents[j] =
                    <Tab.Content>
                        <Tab.Pane eventKey={category.name}>
                            {getH3(270, 125, 'black', "ID: " + category.id)}
                            {getH3(270, 175, 'black', "Name")}
                            {getForm(270, 220, category.name, "300px", this.handleNewNameInputChange)}
                            {getH3(270, 270, 'black', "Request name:")}
                            {getForm(270, 315, category.reqname, "300px", this.handleNewRequestNameInputChange)}
                            {getButton(270, 370, 150, "Edit",
                                function () {
                                    let status = save(
                                        "http://localhost:8081/categories/save",
                                        {
                                            id: category.id,
                                            name:
                                                (this.state.newCategoryName === null) ?
                                                    category.name : this.state.newCategoryName,
                                            reqname:
                                                (this.state.newCategoryRequestName === null) ?
                                                    category.reqname : this.state.newCategoryRequestName,
                                            deleted: false
                                        });
                                    this.nullState();
                                    this.setErrorMessage(status);
                                }.bind(this))}
                            {getButton(270, 420, 150, "Delete",
                                function () {
                                    let status = deleteByID(
                                        "http://localhost:8081/categories/delete/",
                                        category.id);
                                    this.nullState();
                                    this.state.deleteCategoryID = category.id;
                                    this.setErrorMessage(status);
                                }.bind(this))}
                        </Tab.Pane>
                    </Tab.Content>
                j++;
            }
        }
    }

    render() {
        this.init(this.state.searchCategoryName);
        return (
            <div className='mt-5'>
                {getH3(375, 75, 'red', this.errorMessage)}
                {getH3(10, 75, 'black', "Create new category")}
                {getForm(10, 125, "Type name...", "300px", this.handleNewNameInputChange)}
                {getForm(10, 165, "Type request name...", "300px", this.handleNewRequestNameInputChange)}
                {getButton(10, 210, 300, "Create",
                    function () {
                        let status = create(
                            "http://localhost:8081/categories/save",
                            {
                                name: this.state.newCategoryName,
                                reqname: this.state.newCategoryRequestName,
                                deleted: false
                            });
                        this.nullState();
                        this.setErrorMessage(status);
                    }.bind(this))}
                {getH3(10, 270, 'black', "Categories")}
                {getForm(10, 320, "Search for category...", "300px", this.handleSearchInputChange)}
                {getContainer(-5, 360, this.elements, this.contents)}
            </div>
        );
    }
}