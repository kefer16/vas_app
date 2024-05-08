export const convertirFecha = (fechaString: string): string => {
   const fecha = new Date(fechaString);
   return fecha.toLocaleString("es-ES", { timeZone: "UTC" });
};

export function convertirFechaVisual(fecha: string | undefined): string {
   // 2023-04-12T00:25:06.657Z
   if (fecha) {
      const dia = fecha.substring(8, 10);
      const mes = fecha.substring(5, 7);
      const anio = fecha.substring(0, 4);
      const hora = fecha.substring(11, 13);
      const minutos = fecha.substring(14, 16);
      const segundos = fecha.substring(17, 19);
      return `${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos} ${
         parseInt(hora) >= 0 && parseInt(hora) <= 11 ? "AM" : "PM"
      }`;
   }
   return "";
}

export function fechaVisualDateToString(fecha: Date): string {
   // 2023-04-12T00:25:06.657Z
   const fechaString = fecha.toString();
   if (fechaString) {
      const dia = fechaString.substring(8, 10);
      const mes = fechaString.substring(5, 7);
      const anio = fechaString.substring(0, 4);
      const hora = fechaString.substring(11, 13);
      const minutos = fechaString.substring(14, 16);
      const segundos = fechaString.substring(17, 19);
      return `${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos} ${
         parseInt(hora) >= 0 && parseInt(hora) <= 11 ? "AM" : "PM"
      }`;
   }
   return "";
}

export function convertirFechaSQL(fecha: string): string {
   // 2023-04-12T00:25:06.657Z
   const dia = fecha.substring(8, 10);
   const mes = fecha.substring(5, 7);
   const anio = fecha.substring(0, 4);
   const hora = fecha.substring(11, 13);
   const minutos = fecha.substring(14, 16);
   const segundos = fecha.substring(17, 19);

   return `${anio}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;
}

export function crearFechaISO(): string {
   const fecha: Date = new Date(new Date().setHours(new Date().getHours() - 5)); //restamos 5 horas a fecha actual
   const fecha_ISO: string = fecha.toISOString(); //le añade 5 horas
   return fecha_ISO;
}

export function formatoFecha(fechaString: string): string {
   if (fechaString === "") {
      return "";
   }
   const fecha = new Date(
      new Date(fechaString).setHours(new Date(fechaString).getHours() + 5)
   );
   const anio = fecha.getFullYear().toString();
   const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Los meses comienzan desde 0
   const dia = fecha.getDate().toString().padStart(2, "0");
   const hora = fecha.getHours().toString().padStart(2, "0");
   const minuto = fecha.getMinutes().toString().padStart(2, "0");
   const second = fecha.getSeconds().toString().padStart(2, "0");
   return `${dia}/${mes}/${anio} ${hora}:${minuto}:${second}`;
}
export function currentDateISO(): string {
   return new Date(
      new Date().setHours(new Date().getHours() - 5)
   ).toISOString(); //restamos 5 horas a fecha actual
}

export function fechaVisualizarCalendario(fecha: string): Date {
   return new Date(new Date(fecha).setHours(new Date(fecha).getHours() + 5)); //agregamos 5horas a la fecha actual
}
export function convertirFormatoMoneda(moneda: number | undefined): string {
   const formatter = new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 2,
   });
   if (moneda) {
      return formatter.format(moneda);
   } else {
      return "S/. 0.00";
   }
}

export function formatoCalificacion(decimal: number): string {
   const roundedNumber = Math.round(decimal * 10) / 10;
   return roundedNumber.toFixed(1);
}

export const formatoMonedaPerunana = (value: number) => {
   return value.toLocaleString("es-PE", { style: "currency", currency: "PEN" });
};

export const personalizarMensajeError = (error: any): any => {
   if (error.response.data.Error.IsValidate) {
      error.message = "[warn]" + error.response.data.Error.Message;
   } else {
      error.message = error.response.data.Error.Message;
   }
   return error.message;
};

export const validateEmail = (pEmail: string): boolean => {
   // Expresión regular para validar un correo electrónico
   const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

   // Validar el correo electrónico utilizando la expresión regular
   return regex.test(pEmail);
};

export interface WeekDaysProps {
   number: number;
   name: string;
}

// export function getDaysWeek(): WeekDaysProps[] {
//    const daysWeek: WeekDaysProps[] = [];
//    const nameDays: string[] = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
//    const fechaActual: Date = new Date();
//    const diaSemanaActual: number = fechaActual.getDay(); // 0 para Domingo, 1 para Lunes, ..., 6 para Sábado
//    const diferenciaDias: number =
//       diaSemanaActual === 0 ? 6 : diaSemanaActual - 1; // Calcular la diferencia de días para llegar al lunes
//    const milisegundosPorDia: number = 24 * 60 * 60 * 1000; // 1 día en milisegundos
//    const milisegundosHastaLunes: number = diferenciaDias * milisegundosPorDia; // Milisegundos hasta llegar a lunes
//    const fechaLunes: Date = new Date(
//       fechaActual.getTime() - milisegundosHastaLunes
//    ); // Restar la diferencia para obtener el lunes

//    for (let i = 0; i < 7; i++) {
//       daysWeek.push({ number: fechaLunes.getDate(), name: nameDays[i] });
//       fechaLunes.setDate(fechaLunes.getDate() + 1); // Sumar un día
//    }

//    return daysWeek;
// }

export function getDaysWeek(): WeekDaysProps[] {
   const daysWeek: WeekDaysProps[] = [];
   const nameDays: string[] = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
   const currentDate: Date = new Date(
      new Date().setHours(new Date().getHours() - 5)
   );
   const diferenciaDias: number = 3;
   const milisegundosPorDia: number = 24 * 60 * 60 * 1000; // 1 día en milisegundos
   const milisegundosHastaLunes: number = diferenciaDias * milisegundosPorDia; // Milisegundos hasta llegar a lunes
   const date3daysBefore: Date = new Date(
      currentDate.getTime() - milisegundosHastaLunes
   ); // Restar la diferencia para obtener el lunes

   for (let i = 0; i < 7; i++) {
      daysWeek.push({
         number: date3daysBefore.getDate(),
         name: nameDays[date3daysBefore.getDay()],
      });
      date3daysBefore.setDate(date3daysBefore.getDate() + 1); // Sumar un día
   }

   return daysWeek;
}

export function getDay(): number {
   const currentDate: Date = new Date(
      new Date().setHours(new Date().getHours() - 5)
   );
   return currentDate.getDate();
}

export function getMonth(): string {
   const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
   ];
   const currentDate: Date = new Date(
      new Date().setHours(new Date().getHours() - 5)
   );
   const monthNumber = currentDate.getMonth();
   return months[monthNumber];
}

export function getYear(): number {
   const currentDate: Date = new Date(
      new Date().setHours(new Date().getHours() - 5)
   );
   return currentDate.getFullYear();
}
