import { Stack, Link, router } from 'expo-router';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { Container } from '~/src/components/Container';
import { DoodleUnderline } from '~/src/components/DoodleUnderline';
import { Postit } from '~/src/components/Postit';
import { NotebookBackground } from '~/src/components/NotebookBackground';
import { Header } from '~/src/components/Header';
import { DoodleDate } from '~/src/components/DoodleDate';
import { useEffect, useState } from 'react';
import { GroupedProducts, Product } from '~/src/types';
import { addItemToCurrentList, groupProductsByCategory } from '~/src/services/lists/currentListService';
import { FlashList } from '@shopify/flash-list';
import { DoodleMarker } from '~/src/components/DoodleMarker';
import { DoodleCheckbox } from '~/src/components/DoodleCheckbox';
import NotebookLine from '../components/NotebookLine';
import useCurrentList from '../hooks/useCurrentList';
import useProductAutocomplete from '../hooks/useProductAutocomplete';
import { ScrollView } from "react-native";
import SwipeToDelete from '../components/SwipeToDelete';

export default function CurrentList() {

    const { data: groupedData, loading, categories, toggleItemChecked, deleteItem, refetch } = useCurrentList();
    const [query, setQuery] = useState("");
    const [showResults, setShowResults] = useState(false);
    const { filtered, filter } = useProductAutocomplete();

    const handleSelect = async (product: Product) => {
        try {
            await addItemToCurrentList(product.id);
            setQuery("");
            setShowResults(false);
            refetch();
        } catch (err) {
            console.warn("Erro ao adicionar produto");
        }
    };

    const item = (category: string) => {
        return (
            <View className=''>
                <NotebookLine>
                    <DoodleMarker align='center'>
                        <Text className='doodle-medium text-3xl '>{category}</Text>
                    </DoodleMarker>
                </NotebookLine>
                {groupedData[category].map((product: Product) => (
                    <SwipeToDelete key={product.id} onDelete={() => deleteItem(product.id)}>
                        <NotebookLine>
                            <View className='flex-row items-center justify-between w-full'>
                                <Text className='doodle-medium text-4xl'>{product.name}</Text>
                                <DoodleCheckbox
                                    checked={product.checked}
                                    onToggle={() => toggleItemChecked(product.id)}
                                    checkmarkImage={require('~/src/assets/images/doodle-checkmark.png')}
                                />
                            </View>
                        </NotebookLine>
                    </SwipeToDelete>
                ))}

            </View>
        )
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false, statusBarHidden: true }} />
            <Header className='justify-between border-b border-gray-300'>
                <View className='flex-row'>
                    <TouchableOpacity className='px-4' onPress={() => router.back()}>
                        <Text className='doodle-bold text-5xl'>&lt;</Text>
                    </TouchableOpacity>
                    <View className='flex-column'>
                        <Text className='text-4xl doodle'>
                            Lista Atual
                        </Text>
                        <DoodleUnderline />
                    </View>
                </View>
                <DoodleDate />
            </Header>
            <View>
                {loading ? (
                    <View className='px-16'>
                        <ActivityIndicator size="large" />

                    </View>
                ) : (
                    <View className='w-[90%] left-[5%] h-[95%]'>
                        <FlashList
                            data={categories}
                            keyExtractor={(item) => item}
                            estimatedItemSize={50}
                            renderItem={({ item: category }) => (
                                item(category)
                            )}
                            ListFooterComponent={
                                <>
                                    <NotebookLine>
                                        <TextInput
                                            className="py-2 doodle-medium text-3xl"
                                            placeholder="Novo item"
                                            value={query}
                                            onChangeText={(text) => {
                                                setQuery(text);
                                                setShowResults(true);
                                                filter(text);
                                            }}
                                            onFocus={() => setShowResults(true)}
                                            returnKeyType="done"
                                        />
                                    </NotebookLine>
                                    {showResults && filtered.length > 0 && (
                                        <ScrollView
                                            className="bg-white p-2 rounded shadow-md max-h-60"
                                            nestedScrollEnabled={true}
                                        >
                                            {filtered.map((product) => (
                                                <TouchableOpacity
                                                    key={product.id}
                                                    onPress={() => handleSelect(product)}
                                                    className="p-2 border-b border-gray-200"
                                                >
                                                    <Text className="doodle text-xl">
                                                        {product.name} ({product.category})
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    )}
                                </>

                            }
                        />
                    </View>
                )}
            </View>

        </>
    );
}