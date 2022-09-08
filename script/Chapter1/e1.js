export class FahrenheitToCelsius {
    Convert(temperature) {
        return ((temperature - 32) * 5) / 9;
    }
}
export class CelsiusToFahrenheit {
    Convert(temperature) {
        return (temperature * 9) / 5 + 32;
    }
}
export default function TempConverte(temperature, Converter) {
    return Converter.Convert(temperature);
}
//# sourceMappingURL=e1.js.map