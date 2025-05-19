<?php

namespace App\Schemas;

use Prism\Prism\Schema\ObjectSchema;
use Prism\Prism\Schema\StringSchema;

class ItemRecognitionSchema
{
    public static function createPrismSchema($name, $description, $properties)
    {
        $schema = new ObjectSchema(
            name: $name,
            description: $description,
            properties: self::createProperties($properties),
            requiredFields: array_keys($properties)
        );

        return $schema;
    }

}
