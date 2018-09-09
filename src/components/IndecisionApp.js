import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    }
    handleDeleteOptions = () => {
        this.setState(() => ({options: []}));
    }
    handleDeleteOption = (option) => {
        console.log(option);
        this.setState((prevState) => ({
            options: prevState.options.filter(opt => option !== opt)
        }));
    }
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({
            selectedOption: option
        }));
        console.log(!!this.state.selectedOption);
    }
    handleAddOption = (option) => {
        if(!option){
            return 'Enter Valid Option Item'
        } else if(this.state.options.indexOf(option) > -1){
            return 'This item already exists'
        }
        console.log(this.state.options.indexOf(option));
        this.setState((prevState) => ({
                options: prevState.options.concat([option])
        }));
    }
    clearSelectedOption = () => {
        this.setState(() => ({ selectedOption: undefined }));
    }
    render() {
        const subtitle = 'Put your life in the hands of a computer';
        return (
            <div>
                <Header subtitle={subtitle}/>
                <div className="container">
                    <Action 
                    handlePick={this.handlePick} 
                    hasOptions={this.state.options.length > 0}/>
                    <div className="widget">
                        <Options options={this.state.options}
                        handleDeleteOptions={this.handleDeleteOptions}
                        handleDeleteOption={this.handleDeleteOption}/>
                    <AddOption
                        handleAddOption={this.handleAddOption}/>
                    </div>
                </div>
                <OptionModal
                    clearSelectedOption={this.clearSelectedOption}
                    selectedOption={this.state.selectedOption}/>
            </div>
        );
    }
    componentDidMount(){
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options) this.setState(() => ({ options }));
        } catch(e) {

        }

    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }
}

IndecisionApp.defaultProps = {
    options: []
}