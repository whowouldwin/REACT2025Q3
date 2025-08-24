import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Field } from './Field';

describe('Field', () => {
  it('renders label linked to control via htmlFor', () => {
    render(
      <Field label="Email" htmlFor="email" error={undefined}>
        <input id="email" />
      </Field>
    );
    const input = screen.getByLabelText('Email');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'email');

    const errorEl = screen.getByText('', {
      selector: '#email-error',
    }) as HTMLElement | null;
    expect(errorEl).toBeTruthy();
  });

  it('renders children inside the control container', () => {
    render(
      <Field label="Name" htmlFor="name" error={undefined}>
        <input id="name" data-testid="control" />
      </Field>
    );
    expect(screen.getByTestId('control')).toBeInTheDocument();
  });

  it('shows error text and error styling when error is provided', () => {
    render(
      <Field label="Password" htmlFor="pwd" error="Too short">
        <input id="pwd" />
      </Field>
    );
    const error = screen.getByText('Too short');
    expect(error).toBeInTheDocument();
    expect(error.className).toMatch(/text-red-600/);
    expect(error).toHaveAttribute('aria-live', 'polite');
  });

  it('renders transparent error container when no error', () => {
    render(
      <Field label="Age" htmlFor="age" error={undefined}>
        <input id="age" />
      </Field>
    );

    const error = screen.getByText('', {
      selector: '#age-error',
    }) as HTMLElement;
    expect(error.textContent).toBe('');
    expect(error.className).toMatch(/text-transparent/);
  });

  it('merges extra className onto the root', () => {
    const { container } = render(
      <Field
        label="City"
        htmlFor="city"
        error={undefined}
        className="data-test-class"
      >
        <input id="city" />
      </Field>
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toMatch(/mb-3/);
    expect(root.className).toMatch(/data-test-class/);
  });
});
