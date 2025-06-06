import { newE2EPage } from '@stencil/core/testing';

describe('modus-date-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-date-input></modus-date-input>');

    const element = await page.find('modus-date-input');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to label prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-date-input></modus-date-input>');

    const component = await page.find('modus-date-input');
    component.setProperty('label', 'Test');
    await page.waitForChanges();

    const element = await page.find('modus-date-input >>> .label-container > label');
    expect(element.innerHTML).toEqual('Test');
  });

  it('renders changes to disabled', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input></modus-date-input>');

    const textInput = await page.find('modus-date-input');
    const input = await page.find('modus-date-input >>> input');

    expect(textInput).not.toHaveClass('disabled');
    expect(await input.getProperty('disabled')).toBeFalsy();

    textInput.setProperty('disabled', 'true');
    await page.waitForChanges();

    expect(await input.getProperty('disabled')).toBeTruthy();
  });

  it('renders changes to errorText', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input></modus-date-input>');

    const textInput = await page.find('modus-date-input');
    textInput.setProperty('errorText', 'Error.');
    await page.waitForChanges();

    const inputContainer = await page.find('modus-date-input >>> .input-container');
    expect(inputContainer).toHaveClass('error');

    const errorLabel = await page.find('modus-date-input >>> label.error');
    expect(errorLabel).not.toBeNull();
  });

  it('renders changes to validText', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input></modus-date-input>');

    const textInput = await page.find('modus-date-input');
    textInput.setProperty('validText', 'Valid.');
    await page.waitForChanges();

    const inputContainer = await page.find('modus-date-input >>> .input-container');
    expect(inputContainer).toHaveClass('valid');

    const validLabel = await page.find('modus-date-input >>> label.valid');
    expect(validLabel).not.toBeNull();
  });

  it('renders changes to helperText', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input></modus-date-input>');

    const textInput = await page.find('modus-date-input');
    textInput.setProperty('label', 'label');
    await page.waitForChanges();

    textInput.setProperty('helperText', 'Helper.');
    await page.waitForChanges();

    const helperLabel = await page.find('modus-date-input >>> label.helper');
    expect(helperLabel).not.toBeNull();
  });

  it('renders changes to placeholder', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input></modus-date-input>');

    const textInput = await page.find('modus-date-input');
    textInput.setProperty('placeholder', 'Placeholder');
    await page.waitForChanges();

    const input = await page.find('modus-date-input >>> input');
    expect(await input.getProperty('placeholder')).toEqual('Placeholder');
  });

  it('renders changes to required', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input></modus-date-input>');

    const textInput = await page.find('modus-date-input');
    textInput.setProperty('required', 'true');
    await page.waitForChanges();

    const required = await page.find('modus-date-input >>> span.required');
    expect(required).not.toBeNull();
  });

  it('renders changes to autoFocusInput', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input auto-focus-input="true"></modus-date-input>');
    await page.waitForChanges();

    const input = await page.find('modus-date-input >>> input');
    expect(await input.getProperty('autofocus')).toBeTruthy();
  });

  // it('renders changes to autoFormat', async () => {
  //   const page = await newE2EPage();

  //   await page.setContent('<modus-date-input></modus-date-input>');
  //   await page.waitForChanges();

  //   // Input '12'
  //   const input = await page.find('modus-date-input >>> input');
  //   await input.type('12', { delay: 20 });
  //   await page.waitForChanges();

  //   // Formatted
  //   expect(await input.getProperty('value')).toEqual('12/');
  // });

  it('renders changes to format', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input></modus-date-input>');
    await page.waitForChanges();

    const textInput = await page.find('modus-date-input');
    textInput.setProperty('format', 'yyyy-mm');
    await page.waitForChanges();

    textInput.setProperty('value', '2022-12-23');
    await page.waitForChanges();

    const input = await page.find('modus-date-input >>> input');
    expect(await input.getProperty('value')).toEqual('2022-12');
  });

  it('renders changes to allowedCharsRegex', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input></modus-date-input>');
    await page.waitForChanges();

    const textInput = await page.find('modus-date-input');
    textInput.setProperty('allowedCharsRegex', /\d/gi);
    await page.waitForChanges();

    const input = await page.find('modus-date-input >>> input');
    await input.type('JK', { delay: 20 });
    await page.waitForChanges();

    expect(await input.getProperty('value')).toEqual('');
  });

  it('renders changes to value', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input></modus-date-input>');

    const textInput = await page.find('modus-date-input');
    textInput.setProperty('value', '2022-11-21'); // ISO 8601 Format
    await page.waitForChanges();

    const input = await page.find('modus-date-input >>> input');
    expect(await input.getProperty('value')).toEqual('11/21/2022'); // default display format
  });

  it('renders changes to readOnly', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-date-input></modus-date-input>');

    const textInput = await page.find('modus-date-input');
    textInput.setProperty('readOnly', true);
    await page.waitForChanges();

    const input = await page.find('modus-date-input >>> input');
    expect(await input.getProperty('readOnly')).toEqual(true);
  });

  it('renders changes to showCalendarIcon', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-date-input></modus-date-input>');

    let calendar = await page.find('modus-date-input >>> .icon-calendar');
    expect(calendar).toBeFalsy();

    const textInput = await page.find('modus-date-input');
    textInput.setProperty('showCalendarIcon', true);
    await page.waitForChanges();

    calendar = await page.find('modus-date-input >>> .icon-calendar');
    expect(calendar).toBeTruthy();
  });

  it('renders changes to the size prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input></modus-date-input>');
    const component = await page.find('modus-date-input');
    const element = await page.find('modus-date-input >>> .input-container');
    expect(element).not.toHaveClass('large');

    component.setProperty('size', 'large');
    await page.waitForChanges();
    expect(element).toHaveClass('large');
  });

  it('emits calendarIconClicked event', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input show-calendar-icon></modus-date-input>');
    const calendarIconClicked = await page.spyOnEvent('calendarIconClicked');
    const calendar = await page.find('modus-date-input >>> .icon-calendar');

    await calendar.click();
    await page.waitForChanges();
    expect(calendarIconClicked).toHaveReceivedEvent();
  });

  it('emits valueChange event', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input></modus-date-input>');
    const valueChange = await page.spyOnEvent('valueChange');
    const element = await page.find('modus-date-input >>> input');
    await page.waitForChanges();

    await element.type('1/1/2023', { delay: 20 });
    await page.waitForChanges();
    expect(valueChange).toHaveReceivedEvent();
  });

  it('checks invalid date validation', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input show-calendar-icon="true"></modus-date-input>');
    const input = await page.find('modus-date-input >>> input');
    await page.waitForChanges();

    await input.type('1//2023', { delay: 20 });
    await page.waitForChanges();

    const calendar = await page.find('modus-date-input >>> .icon-calendar');
    await calendar.click();
    await page.waitForChanges();

    const errorText = await page.find('modus-date-input >>> .sub-text > label');
    expect(errorText.innerHTML).toEqual('Invalid date');
  });

  it('converts date of alternative format to the main one', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-date-input
        format="mmm d, yyyy"
        show-calendar-icon="true"
        alt-formats="mm-dd-yy"></modus-date-input>`);
    await page.waitForChanges();

    const input = await page.find('modus-date-input >>> input');

    await input.type('01-03-23', { delay: 20 });
    await page.waitForChanges();

    const calendar = await page.find('modus-date-input >>> .icon-calendar');
    await calendar.click();
    await page.waitForChanges();

    expect(await input.getProperty('value')).toEqual('Jan 3, 2023');
  });

  it('accepts the date with a space', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-date-input
        format="mmm dd, yyyy"
        show-calendar-icon="true"
        alt-formats="mmm d, yyyy"></modus-date-input>`);
    await page.waitForChanges();

    const input = await page.find('modus-date-input >>> input');

    await input.type('  May 5, 1988   ', { delay: 20 });
    await page.waitForChanges();

    const calendar = await page.find('modus-date-input >>> .icon-calendar');
    await calendar.click();
    await page.waitForChanges();

    expect(await input.getProperty('value')).toEqual('May 05, 1988');
  });

  it('accepts the date with a space and alternative format', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-date-input
        format="mmm d, yyyy"
        show-calendar-icon="true"
        alt-formats="mm.dd.yy"></modus-date-input>`);
    await page.waitForChanges();

    const input = await page.find('modus-date-input >>> input');

    await input.type('  08.21.12   ', { delay: 20 });
    await page.waitForChanges();

    const calendar = await page.find('modus-date-input >>> .icon-calendar');
    await calendar.click();
    await page.waitForChanges();

    expect(await input.getProperty('value')).toEqual('Aug 21, 2012');
  });

  it('checks invalid max date validation', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-date-input
        show-calendar-icon="true"
        format="mmm d, yyyy"
        max="2023-01-02"></modus-date-input>`);
    await page.waitForChanges();

    const input = await page.find('modus-date-input >>> input');

    await input.type('Jan 3, 2023', { delay: 20 });
    await page.waitForChanges();

    const calendar = await page.find('modus-date-input >>> .icon-calendar');
    await calendar.click();
    await page.waitForChanges();

    const errorText = await page.find('modus-date-input >>> .sub-text > label');
    expect(errorText.innerHTML).toEqual('Select a date before Jan 3, 2023');
  });

  it('checks invalid min date validation', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-date-input
        show-calendar-icon="true"
        format="mmm d, yyyy"
        min="2023-01-02"></modus-date-input>`);
    await page.waitForChanges();

    const input = await page.find('modus-date-input >>> input');

    await input.type('Dec 23, 2022', { delay: 20 });
    await page.waitForChanges();

    const calendar = await page.find('modus-date-input >>> .icon-calendar');
    await calendar.click();
    await page.waitForChanges();

    const errorText = await page.find('modus-date-input >>> .sub-text > label');
    expect(errorText.innerHTML).toEqual('Select a date after Jan 1, 2023');
  });

  it('checks input accepts max date', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-date-input
        show-calendar-icon="true"
        format="mmm d, yyyy"
        max="2023-01-02"></modus-date-input>`);
    await page.waitForChanges();

    const input = await page.find('modus-date-input >>> input');

    await input.type('Jan 2, 2023', { delay: 20 });
    await page.waitForChanges();

    const calendar = await page.find('modus-date-input >>> .icon-calendar');
    await calendar.click();
    await page.waitForChanges();

    const errorText = await page.find('modus-date-input >>> .sub-text > label');
    expect(errorText).toBeFalsy();
  });

  it('checks input accepts min date', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-date-input
        show-calendar-icon="true"
        format="mmm d, yyyy"
        min="2023-05-18"></modus-date-input>`);
    await page.waitForChanges();

    const input = await page.find('modus-date-input >>> input');

    await input.type('May 18, 2023', { delay: 20 });
    await page.waitForChanges();

    const calendar = await page.find('modus-date-input >>> .icon-calendar');
    await calendar.click();
    await page.waitForChanges();

    const errorText = await page.find('modus-date-input >>> .sub-text > label');
    expect(errorText).toBeFalsy();
  });

  it('checks input accepts date when min equals max', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-date-input
        show-calendar-icon="true"
        format="mmm d, yyyy"
        max="2017-07-30"
        min="2017-07-30"></modus-date-input>`);
    await page.waitForChanges();

    const input = await page.find('modus-date-input >>> input');

    await input.type('Jul 30, 2017', { delay: 20 });
    await page.waitForChanges();

    const calendar = await page.find('modus-date-input >>> .icon-calendar');
    await calendar.click();
    await page.waitForChanges();

    const errorText = await page.find('modus-date-input >>> .sub-text > label');
    expect(errorText).toBeFalsy();
  });

  it('checks input accepts date between min and max', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-date-input
        show-calendar-icon="true"
        format="mmm d, yyyy"
        max="2021-11-26"
        min="2017-07-30"></modus-date-input>`);
    await page.waitForChanges();

    const input = await page.find('modus-date-input >>> input');

    await input.type('Mar 6, 2019', { delay: 20 });
    await page.waitForChanges();

    const calendar = await page.find('modus-date-input >>> .icon-calendar');
    await calendar.click();
    await page.waitForChanges();

    const errorText = await page.find('modus-date-input >>> .sub-text > label');
    expect(errorText).toBeFalsy();
  });

  it('renders aria-label on alert div when set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input aria-label="test label"></modus-date-input>');
    const element = await page.find('modus-date-input >>> input');
    expect(element).toBeDefined();
    expect(element).toHaveAttribute('aria-label');
    expect(element.getAttribute('aria-label')).toEqual('test label');
  });

  it('does not render aria-label on alert div when not set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input></modus-date-input>');
    const element = await page.find('modus-date-input >>> input');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('aria-label');
  });

  it('does not render aria-label on alert div when set to empty string', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input aria-label=""></modus-date-input>');
    const element = await page.find('modus-date-input >>> input');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('aria-label');
  });

  it('check the error text is present on clicking outside', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input></modus-date-input>');

    const textInput = await page.find('modus-date-input');
    textInput.setProperty('errorText', 'Error.');
    await page.waitForChanges();

    const inputContainer = await page.find('modus-date-input >>> .input-container');
    expect(inputContainer).toHaveClass('error');

    const errorLabel = await page.find('modus-date-input >>> label.error');
    expect(errorLabel).not.toBeNull();

    const input = await page.find('modus-date-input >>> input');
    await input.click();
    await page.click('body');
    await page.waitForChanges();

    const errorText = await page.find('modus-date-input >>> .sub-text > label');
    expect(errorText.innerHTML).toEqual('Error.');
  });

  it('checks whether an error is shown when an invalid date is entered', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <modus-date-input format="dd-mm-yyyy"></modus-date-input>
    `);
    await page.waitForChanges();

    const input = await page.find('modus-date-input >>> input');
    await input.type('29-02-2025', { delay: 20 });
    await page.waitForChanges();

    await input.press('Enter');
    await page.waitForChanges();

    // Check for error message
    const errorText = await page.find('modus-date-input >>> .sub-text > label');
    expect(errorText).not.toBeNull();

    const errorMessage = await errorText.textContent;
    expect(errorMessage.trim()).toEqual('Invalid date');
  });
});
