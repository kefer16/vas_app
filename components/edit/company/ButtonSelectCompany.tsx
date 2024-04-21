import { View, Text, useColorScheme } from "react-native";
import React, { RefObject, useCallback, useMemo, useState } from "react";
import { OptionSelect } from "@/entities/ButtonSelect";
import {
   BottomSheetBackdrop,
   BottomSheetModal,
   BottomSheetModalProvider,
   BottomSheetScrollView,
   BottomSheetView,
} from "@gorhom/bottom-sheet";
import Separator from "@/components/Separator";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Colors from "@/constants/Colors";
import InputTextSearchCustom from "@/components/InputTextSearchCustom";
import Checkbox from "expo-checkbox";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
   bottomSheetModalRef: RefObject<BottomSheetModalMethods>;
   options: OptionSelect[];
   // funOptions: Dispatch<SetStateAction<OptionSelect[]>>;
   // initialValue: string;
   // funOptionSelect: Dispatch<SetStateAction<OptionSelect>>;
   funOptionSelected: (pArray: OptionSelect[], pId: string) => void;
}

const ButtonSelectCompany = ({
   bottomSheetModalRef,
   options,
   funOptionSelected,
}: Props) => {
   const colorScheme = useColorScheme();
   const [search, setSearch] = useState<string>("");
   const [filterSearch, setFilterSearch] = useState<OptionSelect[]>(options);

   const searchFilter = (pSearch: string) => {
      setFilterSearch(
         options.filter(
            (item) =>
               item.text
                  .toLowerCase()
                  .trim()
                  .includes(pSearch.toLocaleLowerCase().trim()) || item.selected
         )
      );
   };

   const renderBackground = useCallback(
      (props: any) => (
         <BottomSheetBackdrop
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            {...props}
         />
      ),
      []
   );

   // variables
   const snapPoints = useMemo(() => ["25%", "50%"], []);

   // callbacks

   const handleSheetChanges = useCallback((index: number) => {}, []);

   return (
      <BottomSheetModalProvider>
         <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backdropComponent={renderBackground}
            // enablePanDownToClose={false}
            enableContentPanningGesture={false}
            backgroundStyle={{
               backgroundColor: Colors[colorScheme ?? "light"].container,
            }}
            handleIndicatorStyle={{
               backgroundColor: Colors[colorScheme ?? "light"].text,
            }}
         >
            <BottomSheetView
               style={{
                  flex: 1,
                  gap: 10,
                  paddingVertical: 10,
                  paddingBottom: 10,
                  flexDirection: "column",
                  backgroundColor: Colors[colorScheme ?? "light"].container,
                  // backgroundColor: "red",
               }}
            >
               <Text
                  style={{
                     fontSize: 20,
                     fontFamily: "Poppins600",
                     paddingHorizontal: 10,

                     color: Colors[colorScheme ?? "light"].textTitle,
                  }}
               >
                  Compañias
               </Text>

               <InputTextSearchCustom
                  containerStyle={{ paddingHorizontal: 10 }}
                  value={search}
                  keyboardType="web-search"
                  funButtonSearch={() => searchFilter(search)}
                  functionChangeText={setSearch}
                  placeholder="Buscar"
               />
               <Separator />
               <BottomSheetScrollView>
                  <View style={{ display: "flex", gap: 10 }}>
                     {filterSearch.map((item: OptionSelect, index: number) => {
                        return (
                           <TouchableOpacity
                              onPress={() =>
                                 funOptionSelected(options, item.value)
                              }
                              style={{
                                 display: "flex",
                                 flexDirection: "column",
                                 // paddingHorizontal: 10,
                                 gap: 10,
                              }}
                           >
                              <View
                                 style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    paddingHorizontal: 20,
                                    gap: 10,
                                 }}
                              >
                                 <Checkbox
                                    style={{
                                       borderRadius: 50,
                                    }}
                                    color={
                                       Colors[colorScheme ?? "light"]
                                          .buttonContainer
                                    }
                                    value={item.selected}
                                    // onValueChange={setValue}
                                 />
                                 <Text
                                    style={{
                                       color: Colors[colorScheme ?? "light"]
                                          .text,
                                    }}
                                    key={item.value}
                                 >
                                    {item.text}
                                 </Text>
                              </View>
                              {filterSearch.length - 1 > index && <Separator />}
                           </TouchableOpacity>
                        );
                     })}
                  </View>
               </BottomSheetScrollView>
            </BottomSheetView>
         </BottomSheetModal>
      </BottomSheetModalProvider>
   );
};

export default ButtonSelectCompany;
