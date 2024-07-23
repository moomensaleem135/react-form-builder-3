/**
 * <Toolbar />
 */

import React from "react";
import { injectIntl } from "react-intl";
import ToolbarItem from "./toolbar-draggable-item";
import ToolbarGroupItem from "./toolbar-group-item";

import ID from "./UUID";
import store from "./stores/store";
import { groupBy } from "./functions";
import { FaParagraph,FaArrowsAltH,FaCaretDown,FaRegCheckSquare,FaRegDotCircle ,FaEnvelope,FaImage, FaRegCalendarAlt, FaSlidersH, FaBold, FaChevronCircleDown, FaTextHeight, FaUpload, FaFont, FaTags, FaPlus, FaPhoneAlt, FaBars, FaStar, FaPenSquare, FaLink, FaCamera      } from "react-icons/fa";
import { TbCircleLetterN } from "react-icons/tb";
import { TfiLayoutColumn2,TfiLayoutColumn3  } from "react-icons/tfi";
import { GrColumns } from "react-icons/gr";
import { FaFileCirclePlus } from "react-icons/fa6";
import { MdOutlineFileUpload,MdOutlineTitle, MdTitle } from "react-icons/md";
// function isDefaultItem(item) {
//   const keys = Object.keys(item);
//   return keys.filter(x => x !== 'element' && x !== 'key' && x !== 'group_name').length === 0;
// }

function buildItems(items, defaultItems) {
  if (!items) {
    return defaultItems;
  }
  return items.map((x) => {
    let found = defaultItems.find(
      (y) => x.element === y.element && y.key === x.key
    );
    if (!found) {
      found = defaultItems.find(
        (y) => (x.element || x.key) === (y.element || y.key)
      );
    }
    if (found) {
      if (x.inherited !== false) {
        found = { ...found, ...x };
      } else if (x.group_name) {
        found.group_name = x.group_name;
      }
    }
    return found || x;
  });
}

function buildGroupItems(allItems) {
  const items = allItems.filter((x) => !x.group_name);
  const gItems = allItems.filter((x) => !!x.group_name);
  const grouped = groupBy(gItems, (x) => x.group_name);
  const groupKeys = gItems
    .map((x) => x.group_name)
    .filter((v, i, self) => self.indexOf(v) === i);
  return { items, grouped, groupKeys };
}
const size="1rem"
class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    const { intl } = this.props;
    const items = buildItems(props.items, this._defaultItems(intl));
    this.state = {
      items,
    };
    this.create = this.create.bind(this);
  }

  componentDidMount() {
    store.subscribe((state) => this.setState({ store: state }));
  }

  static _defaultItemOptions(element, intl) {
    switch (element) {
      case "Dropdown":
        return [
          {
            value: "place_holder_option_1",
            text: intl.formatMessage({ id: "place-holder-option-1" }),
            key: `dropdown_option_${ID.uuid()}`,
          },
          {
            value: "place_holder_option_2",
            text: intl.formatMessage({ id: "place-holder-option-2" }),
            key: `dropdown_option_${ID.uuid()}`,
          },
          {
            value: "place_holder_option_3",
            text: intl.formatMessage({ id: "place-holder-option-3" }),
            key: `dropdown_option_${ID.uuid()}`,
          },
        ];
      case "Tags":
        return [
          {
            value: "place_holder_tag_1",
            text: intl.formatMessage({ id: "place-holder-tag-1" }),
            key: `tags_option_${ID.uuid()}`,
          },
          {
            value: "place_holder_tag_2",
            text: intl.formatMessage({ id: "place-holder-tag-2" }),
            key: `tags_option_${ID.uuid()}`,
          },
          {
            value: "place_holder_tag_3",
            text: intl.formatMessage({ id: "place-holder-tag-3" }),
            key: `tags_option_${ID.uuid()}`,
          },
        ];
      case "Checkboxes":
        return [
          {
            value: "place_holder_option_1",
            text: intl.formatMessage({ id: "place-holder-option-1" }),
            key: `checkboxes_option_${ID.uuid()}`,
          },
          {
            value: "place_holder_option_2",
            text: intl.formatMessage({ id: "place-holder-option-2" }),
            key: `checkboxes_option_${ID.uuid()}`,
          },
          {
            value: "place_holder_option_3",
            text: intl.formatMessage({ id: "place-holder-option-3" }),
            key: `checkboxes_option_${ID.uuid()}`,
          },
        ];
      case "RadioButtons":
        return [
          {
            value: "place_holder_option_1",
            text: intl.formatMessage({ id: "place-holder-option-1" }),
            key: `radiobuttons_option_${ID.uuid()}`,
          },
          {
            value: "place_holder_option_2",
            text: intl.formatMessage({ id: "place-holder-option-2" }),
            key: `radiobuttons_option_${ID.uuid()}`,
          },
          {
            value: "place_holder_option_3",
            text: intl.formatMessage({ id: "place-holder-option-3" }),
            key: `radiobuttons_option_${ID.uuid()}`,
          },
        ];
      default:
        return [];
    }
  }

  _defaultItems(intl) {
    return [
      {
        key: "Header",
        name: intl.formatMessage({ id: "header-text" }),
        icon: <FaTextHeight size={size} /> ,
        static: true,
        content: intl.formatMessage({ id: "place-holder-text" }),
      },
      {
        key: "Label",
        name: intl.formatMessage({ id: "label" }),
        static: true,
        icon: <FaFont size={size} />,
        content: intl.formatMessage({ id: "place-holder-text" }),
      },
      {
        key: "Paragraph",
        name: intl.formatMessage({ id: "paragraph" }),
        static: true,
        icon: <FaParagraph size={size} />,
        content: intl.formatMessage({ id: "place-holder-text" }),
      },
      {
        key: "LineBreak",
        name: intl.formatMessage({ id: "line-break" }),
        static: true,
        icon: <FaArrowsAltH size={size}/>,
      },
      {
        key: "Dropdown",
        canHaveAnswer: true,
        name: intl.formatMessage({ id: "dropdown" }),
        icon: <FaCaretDown size={size}/> ,
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "dropdown_",
        options: [],
      },
      {
        key: "Tags",
        canHaveAnswer: true,
        name: intl.formatMessage({ id: "tags" }),
        icon: <FaTags size={size} />,
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "tags_",
        options: [],
      },
      {
        key: "Checkboxes",
        canHaveAnswer: true,
        name: intl.formatMessage({ id: "checkboxes" }),
        icon: <FaRegCheckSquare size={size} />,
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "checkboxes_",
        options: [],
      },
      {
        key: "RadioButtons",
        canHaveAnswer: true,
        name: intl.formatMessage({ id: "multiple-choice" }),
        icon: <FaRegDotCircle size={size}/> ,
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "radiobuttons_",
        options: [],
      },
      {
        key: "TextInput",
        canHaveAnswer: true,
        name: intl.formatMessage({ id: "text-input" }),
        label: intl.formatMessage({ id: "place-holder-label" }),
        icon:<FaFont size={size} />,
        field_name: "text_input_",
      },
      {
        key: "EmailInput",
        canHaveAnswer: true,
        name: intl.formatMessage({ id: "email-input" }),
        label: intl.formatMessage({ id: "place-holder-email" }),
        icon: <FaEnvelope size={size}/> ,
        field_name: "email_input_",
      },
      {
        key: "NumberInput",
        canHaveAnswer: true,
        name: intl.formatMessage({ id: "number-input" }),
        label: intl.formatMessage({ id: "place-holder-label" }),
        icon: <FaPlus size={size} />,
        field_name: "number_input_",
      },
      {
        key: "PhoneNumber",
        canHaveAnswer: true,
        name: intl.formatMessage({ id: "phone-input" }),
        label: intl.formatMessage({ id: "place-holder-phone-number" }),
        icon: <FaPhoneAlt />,
        field_name: "phone_input_",
      },
      {
        key: "TextArea",
        canHaveAnswer: true,
        name: intl.formatMessage({ id: "multi-line-input" }),
        label: intl.formatMessage({ id: "place-holder-label" }),
        icon: <TbCircleLetterN size={size} />,
        field_name: "text_area_",
      },
      {
        key: "FieldSet",
        canHaveAnswer: false,
        name: intl.formatMessage({ id: "fieldset" }),
        label: intl.formatMessage({ id: "fieldset" }),
        icon: <FaBars size={size} />,
        field_name: "fieldset-element",
      },
      {
        key: "TwoColumnRow",
        canHaveAnswer: false,
        name: intl.formatMessage({ id: "two-columns-row" }),
        label: "",
        icon: <TfiLayoutColumn2 size={size}/>,
        field_name: "two_col_row_",
      },
      {
        key: "ThreeColumnRow",
        canHaveAnswer: false,
        name: intl.formatMessage({ id: "three-columns-row" }),
        label: "",
        icon: <TfiLayoutColumn3 size={size}/> ,
        field_name: "three_col_row_",
      },
      {
        key: "FourColumnRow",
        element: "MultiColumnRow",
        canHaveAnswer: false,
        name: intl.formatMessage({ id: "four-columns-row" }),
        label: "",
        icon: <GrColumns size={size} />,
        field_name: "four_col_row_",
        col_count: 4,
        class_name: "col-md-3",
      },
      {
        key: "FiveColumnRow",
        element: "MultiColumnRow",
        canHaveAnswer: false,
        name: intl.formatMessage({ id: "five-columns-row" }),
        label: "",
        icon: <GrColumns size={size} />,
        field_name: "five_col_row_",
        col_count: 5,
        class_name: "col",
      },
      {
        key: "SixColumnRow",
        element: "MultiColumnRow",
        canHaveAnswer: false,
        name: intl.formatMessage({ id: "six-columns-row" }),
        label: "",
        icon: <GrColumns size={size} />,
        field_name: "six_col_row_",
        col_count: 6,
        class_name: "col-md-2",
      },
      {
        key: "Image",
        name: intl.formatMessage({ id: "image" }),
        label: "",
        icon: <FaImage size={size} />,
        field_name: "image_",
        src: "",
      },
      {
        key: "Rating",
        canHaveAnswer: true,
        name: intl.formatMessage({ id: "rating" }),
        label: intl.formatMessage({ id: "place-holder-label" }),
        icon: <FaStar size={size} />,
        field_name: "rating_",
      },
      {
        key: "DatePicker",
        canDefaultToday: true,
        canReadOnly: true,
        dateFormat: "MM/dd/yyyy",
        timeFormat: "hh:mm aa",
        showTimeSelect: false,
        showTimeSelectOnly: false,
        showTimeInput: false,
        name: intl.formatMessage({ id: "date" }),
        icon: <FaRegCalendarAlt size={size} />,
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "date_picker_",
      },
      {
        key: "Signature",
        canReadOnly: true,
        name: intl.formatMessage({ id: "signature" }),
        icon: <FaPenSquare size={size} />,
        label: intl.formatMessage({ id: "signature" }),
        field_name: "signature_",
      },
      {
        key: "HyperLink",
        name: intl.formatMessage({ id: "website" }),
        icon: <FaLink size={size} />,
        static: true,
        content: intl.formatMessage({ id: "place-holder-website-link" }),
        href: "http://www.example.com",
      },
      {
        key: "Download",
        name: intl.formatMessage({ id: "file-attachment" }),
        icon: <FaFileCirclePlus size={size} />,
        static: true,
        content: intl.formatMessage({ id: "place-holder-file-name" }),
        field_name: "download_",
        file_path: "",
        _href: "",
      },
      {
        key: "Range",
        name: intl.formatMessage({ id: "range" }),
        icon: <FaSlidersH size={size} />,
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "range_",
        step: 1,
        default_value: 3,
        min_value: 1,
        max_value: 5,
        min_label: intl.formatMessage({ id: "easy" }),
        max_label: intl.formatMessage({ id: "difficult" }),
      },
      {
        key: "Button",
        name: intl.formatMessage({ id: "Button" }),
        icon: <FaBold size={size} />,
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "button",
        marginTop: "0",
      },
      {
        key: "Camera",
        name: intl.formatMessage({ id: "camera" }),
        icon: <FaCamera size={size} />,
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "camera_",
      },
      {
        key: "FileUpload",
        name: intl.formatMessage({ id: "file-upload" }),
        icon: <FaUpload size={size} />,
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "file_upload_",
      },
      {
        key: "Collapse",
        name: intl.formatMessage({ id: "Collapse" }),
        icon: <FaChevronCircleDown size={size} />,
        label: intl.formatMessage({ id: "place-holder-label" }),
        field_name: "collapse_",
      },
    ];
  }

  addCustomOptions(item, elementOptions) {
    if (item.type === "custom") {
      const customOptions = Object.assign({}, item, elementOptions);
      customOptions.custom = true;
      customOptions.component = item.component || null;
      customOptions.custom_options = item.custom_options || [];
      return customOptions;
    }
    return elementOptions;
  }

  create(item) {
    const { intl } = this.props;
    const elementKey = item.element || item.key;
    const elementOptions = this.addCustomOptions(item, {
      id: ID.uuid(),
      element: elementKey,
      text: item.name,
      group_name: item.group_name,
      static: item.static,
      required: false,
      showDescription: item.showDescription,
    });
    elementOptions.marginTop = 0;
    if (this.props.showDescription === true && !item.static) {
      elementOptions.showDescription = true;
    }

    if (item.static) {
      elementOptions.bold = false;
      elementOptions.italic = false;
      elementOptions.marginTop = 0;
    }

    if (item.canHaveAnswer) {
      elementOptions.canHaveAnswer = item.canHaveAnswer;
    }

    if (item.canReadOnly) {
      elementOptions.readOnly = false;
    }

    if (item.canDefaultToday) {
      elementOptions.defaultToday = false;
    }

    if (item.content) {
      elementOptions.content = item.content;
    }

    if (item.href) {
      elementOptions.href = item.href;
    }

    if (item.inherited !== undefined) {
      elementOptions.inherited = item.inherited;
    }

    elementOptions.canHavePageBreakBefore =
      item.canHavePageBreakBefore !== false;
    elementOptions.canHaveAlternateForm = item.canHaveAlternateForm !== false;
    elementOptions.canHaveDisplayHorizontal =
      item.canHaveDisplayHorizontal !== false;
    if (elementOptions.canHaveDisplayHorizontal) {
      elementOptions.inline = item.inline;
    }
    elementOptions.canHaveOptionCorrect = item.canHaveOptionCorrect !== false;
    elementOptions.canHaveOptionValue = item.canHaveOptionValue !== false;
    elementOptions.canPopulateFromApi = item.canPopulateFromApi !== false;

    if (item.class_name) {
      elementOptions.class_name = item.class_name;
    }

    if (elementKey === "Image") {
      elementOptions.src = item.src;
      elementOptions.height=240;
      elementOptions.width=320
    }
    if (elementKey === "Button") {
      elementOptions.color = 'secondary';
    }
    if (elementKey === "DatePicker") {
      elementOptions.dateFormat = item.dateFormat;
      elementOptions.timeFormat = item.timeFormat;
      elementOptions.showTimeSelect = item.showTimeSelect;
      elementOptions.showTimeSelectOnly = item.showTimeSelectOnly;
      // elementOptions.showTimeInput = item.showTimeInput;
      elementOptions.canHaveAnswer=true
    }

    if (elementKey === "Download") {
      elementOptions._href = item._href;
      elementOptions.file_path = item.file_path;
      elementOptions.height=240;
      elementOptions.width=320
    }
    if (elementKey === "FileUpload") {
      elementOptions.file={}
    }

    if (elementKey === "Range") {
      elementOptions.step = item.step;
      elementOptions.default_value = item.default_value;
      elementOptions.min_value = item.min_value;
      elementOptions.max_value = item.max_value;
      elementOptions.min_label = item.min_label;
      elementOptions.max_label = item.max_label;
    }

    if (item.element === "MultiColumnRow") {
      elementOptions.col_count = item.col_count;
      elementOptions.columnGap=10
    }
    if (elementKey === "Collapse") {
      elementOptions.isVisible = false;
      elementOptions.children="Children placeholder";
      // elementOptions.dirty=true

    }

    if (item.defaultValue) {
      elementOptions.defaultValue = item.defaultValue;
    }

    if (item.field_name) {
      elementOptions.initialFieldName=item.field_name
      elementOptions.field_name = item.field_name + ID.uuid();
    }

    if (item.label) {
      elementOptions.label = item.label;
    }

    if (item.options) {
      if (item.options.length > 0) {
        elementOptions.options = item.options.map((x) => ({
          ...x,
          key: `custom_option_${ID.uuid()}`,
        }));
      } else {
        elementOptions.options = Toolbar._defaultItemOptions(
          elementOptions.element,
          intl
        );
      }
    }

    return elementOptions;
  }

  _onClick(item) {
    // ElementActions.createElement(this.create(item));
    store.dispatch("create", this.create(item));
    
  }

  renderItem = (item) => (
    <ToolbarItem
      data={item}
      key={item.key}
      onClick={this._onClick.bind(this, item)}
      onCreate={this.create}
    />
  );

  render() {
    const { items, grouped, groupKeys } = buildGroupItems(this.state.items);
    return (
      <div className="col-md-3 react-form-builder-toolbar float-right">
        <h4>{this.props.intl.formatMessage({ id: "toolbox" })}</h4>
        <ul>
          {items.map(this.renderItem)}
          {groupKeys.map((k) => (
            <ToolbarGroupItem
              key={k}
              name={k}
              group={grouped.get(k)}
              renderItem={this.renderItem}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default injectIntl(Toolbar);
