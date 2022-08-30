interface TemperatureConverter {
  Convert(temp: number): number;
}
export class FahrenheitToCelsius {
  Convert(temperature: number): number {
    return ((temperature - 32) * 5) / 9;
  }
}
export class CelsiusToFahrenheit {
  Convert(temperature: number): number {
    return (temperature * 9) / 5 + 32;
  }
}

export default function TempConverte<T extends TemperatureConverter>(
  temperature: number,
  Converter: T
) {
  return Converter.Convert(temperature);
}
