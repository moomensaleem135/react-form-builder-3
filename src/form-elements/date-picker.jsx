import React from "react";
import { format, parse, parseISO } from "date-fns";
import ReactDatePicker from "react-datepicker";
import ComponentHeader from "./component-header";
import ComponentLabel from "./component-label";

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();

    const { formatMask } = DatePicker.updateFormat(props, null);
    this.state = DatePicker.updateDateTime(props, { formatMask }, formatMask);
  }

  // formatMask = '';

  handleChange = (dt) => {
    let placeholder;
    const { formatMask } = this.state;
   this.state.value=dt.target.value
    // if (dt.target) {
    //   placeholder =
    //     dt && dt.target && dt.target.value === ""
    //       ? formatMask.toLowerCase()
    //       : "";
    //   const formattedDate = dt.target.value
    //     ? format(parseISO(dt.target.value), formatMask)
    //     : format(parseISO(dt.target.value), formatMask);
    //   this.setState({
    //     value: formattedDate,
    //     internalValue: formattedDate,
    //     placeholder,
    //   });
    //   console.log("formated date", formattedDate);
    //   (this.state.value = formattedDate),
    //     (this.state.internalValue = formattedDate),
    //     (this.state.placeholder = placeholder);
    // } else {
    //   this.setState({
    //     value: dt ? format(dt, formatMask) : "",
    //     internalValue: dt,
    //     placeholder,
    //   });
    //   console.log("formated date", format(dt, formatMask));
    //   this.state.value = dt ? format(dt, formatMask) : "";
    //   (this.state.internalValue = dt),
    //     (this.state.placeholder = dt === "" ? formatMask.toLowerCase() : "");
    // }
    // console.log(this.state);
  };

  static updateFormat(props, oldFormatMask) {
    const { showTimeSelect, showTimeSelectOnly, showTimeInput } = props.data;
    const dateFormat =
      showTimeSelect && showTimeSelectOnly ? "" : props.data.dateFormat;
    const timeFormat =
      showTimeSelect || showTimeInput ? props.data.timeFormat : "";
    const formatMask = `${dateFormat} ${timeFormat}`.trim();
    const updated = formatMask !== oldFormatMask;

    return { updated, formatMask };
  }

  static updateDateTime(props, state, formatMask) {
    let value;
    let internalValue;
    const { defaultToday } = props.data;
    if (
      defaultToday &&
      (props.defaultValue === "" || props.defaultValue === undefined)
    ) {
      value = format(new Date(), formatMask);
      internalValue = new Date();
    } else {
      value = props.defaultValue;

      if (value === "" || value === undefined) {
        internalValue = undefined;
      } else {
        internalValue = parse(value, state.formatMask, new Date());
      }
    }
    return {
      value,
      internalValue,
      placeholder: formatMask.toLowerCase(),
      defaultToday,
      formatMask: state.formatMask,
    };
  }

  // componentWillReceiveProps(props) {
  //   const formatUpdated = this.updateFormat(props);
  //   if ((props.data.defaultToday !== !this.state.defaultToday) || formatUpdated) {
  //     const state = this.updateDateTime(props, this.formatMask);
  //     this.setState(state);
  //   }
  // }

  static getDerivedStateFromProps(props, state) {
    const { updated, formatMask } = DatePicker.updateFormat(
      props,
      state.formatMask
    );
    if (props.data.defaultToday !== state.defaultToday || updated) {
      const newState = DatePicker.updateDateTime(props, state, formatMask);
      return newState;
    }
    return null;
  }

  render() {
    const { showTimeSelect, showTimeSelectOnly, showTimeInput } =
      this.props.data;
    const props = {};
    props.type = "date";
    props.className = "form-control";
    props.name = this.props.data.field_name;
    const readOnly = this.props.data.readOnly || this.props.read_only;
    const iOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const placeholderText = this.state.formatMask.toLowerCase();

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }

    let baseClasses = "SortableItem rfb-item";
    if (this.props.data.pageBreakBefore) {
      baseClasses += " alwaysbreak";
    }
    let inputType = "date";
    if (showTimeSelect && !showTimeSelectOnly) {
      inputType = "datetime-local";
    } else if (showTimeSelect && showTimeSelectOnly) {
      inputType = "time";
    } else {
      inputType = "date";
    }
    return (
      <div
        className={baseClasses}
        style={{
          ...this.props.style,
          marginTop: `${this.props.data.marginTop}px`,
        }}
      >
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <div  style={{maxWidth:'13rem !important'}}>
            {/* {readOnly && (
              <input
                type="text"
                name={props.name}
                ref={props.ref}
                readOnly={readOnly}
                placeholder={this.state.placeholder}
                value={this.state.value}
                className="form-control"
                style={{ width: "12rem" }}
              />
            )}
            {iOS && !readOnly && (
              <input
                type="date"
                name={props.name}
                ref={props.ref}
                onChange={this.handleChange}
                dateFormat="MM/DD/YYYY"
                value={this.state.value}
                className="form-control"
              />
            )}
            {!iOS && !readOnly && (
              <ReactDatePicker
                name={props.name}
                ref={props.ref}
                onChange={this.handleChange}
                selected={this.state.internalValue}
                todayButton={"Today"}
                className="form-control"
                isClearable={true}
                showTimeSelect={showTimeSelect}
                showTimeSelectOnly={showTimeSelectOnly}
                showTimeInput={showTimeInput}
                dateFormat={this.state.formatMask}
                portalId="root-portal"
                autoComplete="off"
                placeholderText={placeholderText}
              />
            )} */}
          
            <input
              name={props.name}
              // ref={props.ref}
              type={inputType}
              onChange={this.handleChange}
              value={this.state.value}
              className="form-control"
             
              // portalId="root-portal"
              // placeholderText={placeholderText}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DatePicker;
